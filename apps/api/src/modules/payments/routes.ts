import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import {
  activityLogs,
  orders,
  transactions,
  users,
  webhookEvents,
} from "@riyanshamrit/database";
import { z } from "zod";
import type { AppInstance, RouteCtx } from "../../lib/http.js";
import { fail, ok, requireUser } from "../../lib/http.js";

const initiateSchema = z.object({
  orderId: z.string().uuid(),
});

export async function registerPaymentRoutes(app: AppInstance, ctx: RouteCtx) {
  app.post("/api/v1/payments/payu/initiate", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    if (!ctx.payments) {
      throw fail("PAYU_UNCONFIGURED", "PayU credentials missing", 503, req.id);
    }
    const user = requireUser(req);
    const body = initiateSchema.parse(req.body);

    const [order] = await ctx.db
      .select()
      .from(orders)
      .where(eq(orders.id, body.orderId))
      .limit(1);
    if (!order || order.userId !== user.id) {
      throw fail("NOT_FOUND", "Order not found", 404, req.id);
    }

    const [profile] = await ctx.db
      .select()
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    const txnid = order.payuTxnId ?? `RA${randomUUID().replace(/-/g, "").slice(0, 20)}`;
    await ctx.db
      .update(orders)
      .set({ payuTxnId: txnid, updatedAt: new Date() })
      .where(eq(orders.id, order.id));

    await ctx.db
      .update(transactions)
      .set({ payuTxnId: txnid, updatedAt: new Date() })
      .where(eq(transactions.orderId, order.id));

    const firstname = profile?.fullName ?? "Customer";
    const email = profile?.email ?? user.email ?? "customer@riyanshamrit.com";
    const payment = ctx.payments.initiate({
      txnid,
      amount: String(order.totalAmount),
      productinfo: `Order ${order.id}`,
      firstname,
      email,
      phone: profile?.phone ?? undefined,
      surl: process.env.PAYU_SUCCESS_URL ?? `${ctx.appUrl}/orders/success`,
      furl: process.env.PAYU_FAILURE_URL ?? `${ctx.appUrl}/orders/failure`,
      udf1: order.id,
    });

    return ok(payment, req.id);
  });

  app.post("/api/v1/payments/payu/webhook", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    if (!ctx.payments) {
      throw fail("PAYU_UNCONFIGURED", "PayU credentials missing", 503, req.id);
    }

    const payload = req.body as Record<string, string>;
    if (!ctx.payments.verifyWebhook(payload)) {
      throw fail("INVALID_SIGNATURE", "Invalid PayU hash", 401, req.id);
    }

    const eventId = `${payload.txnid}:${payload.mihpayid ?? payload.status}`;
    const [existingEvent] = await ctx.db
      .select()
      .from(webhookEvents)
      .where(eq(webhookEvents.eventId, eventId))
      .limit(1);
    if (existingEvent?.processedAt) {
      return ok({ duplicate: true }, req.id);
    }

    await ctx.db
      .insert(webhookEvents)
      .values({
        provider: "payu",
        eventId,
        payload,
      })
      .onConflictDoNothing();

    const status = (payload.status ?? "").toLowerCase();
    const paid = status === "success" || status === "captured";

    await ctx.db
      .update(orders)
      .set({
        payuStatus: payload.status,
        payuMihpayId: payload.mihpayid,
        status: paid ? "paid" : status === "failure" ? "cancelled" : "pending",
        paidAt: paid ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(orders.payuTxnId, payload.txnid));

    await ctx.db
      .update(transactions)
      .set({
        status: paid ? "success" : status,
        mihpayId: payload.mihpayid,
        mode: payload.mode,
        rawResponse: payload,
        updatedAt: new Date(),
      })
      .where(eq(transactions.payuTxnId, payload.txnid));

    await ctx.db
      .update(webhookEvents)
      .set({ processedAt: new Date() })
      .where(eq(webhookEvents.eventId, eventId));

    await ctx.db.insert(activityLogs).values({
      action: "payu.webhook",
      entityType: "transaction",
      entityId: payload.txnid,
      description: `PayU webhook status=${payload.status}`,
      metadata: { mihpayid: payload.mihpayid },
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    return ok({ processed: true }, req.id);
  });
}
