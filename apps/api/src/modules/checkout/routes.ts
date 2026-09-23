import { and, eq, sql } from "drizzle-orm";
import {
  activityLogs,
  cartItems,
  idempotencyKeys,
  inventoryMovements,
  orderItems,
  orders,
  products,
  transactions,
} from "@riyanshamrit/database";
import { checkoutSchema } from "@riyanshamrit/validation";
import type { AppInstance, RouteCtx } from "../../lib/http.js";
import { fail, ok, requireUser } from "../../lib/http.js";

export async function registerCheckoutRoutes(app: AppInstance, ctx: RouteCtx) {
  app.post("/api/v1/checkout", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    const user = requireUser(req);
    const body = checkoutSchema.parse(req.body);
    const idempotencyKey = req.headers["idempotency-key"];

    if (typeof idempotencyKey === "string" && idempotencyKey) {
      const [existing] = await ctx.db
        .select()
        .from(idempotencyKeys)
        .where(eq(idempotencyKeys.key, idempotencyKey))
        .limit(1);
      if (existing?.responseBody) {
        return ok(existing.responseBody, req.id);
      }
    }

    const lines = await ctx.db
      .select({
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        name: products.name,
        imageUrl: products.imageUrl,
        price: products.price,
        stockQuantity: products.stockQuantity,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, user.id));

    if (lines.length === 0) {
      throw fail("EMPTY_CART", "Cart is empty", 400, req.id);
    }

    for (const line of lines) {
      if (!line.productId) continue;
      if ((line.stockQuantity ?? 0) < line.quantity) {
        throw fail("OUT_OF_STOCK", `Insufficient stock for ${line.name}`, 409, req.id);
      }
    }

    const total = lines.reduce(
      (sum, line) => sum + Number(line.price) * line.quantity,
      0,
    );

    const result = await ctx.db.transaction(async (tx) => {
      const [order] = await tx
        .insert(orders)
        .values({
          userId: user.id,
          totalAmount: total.toFixed(2),
          status: "pending",
          shippingAddress: body.shippingAddress,
          billingAddress: body.billingAddress ?? body.shippingAddress,
          notes: body.notes,
        })
        .returning();

      for (const line of lines) {
        if (!line.productId) continue;
        await tx.insert(orderItems).values({
          orderId: order.id,
          productId: line.productId,
          productName: line.name,
          productImage: line.imageUrl,
          quantity: line.quantity,
          price: line.price,
        });

        const updated = await tx
          .update(products)
          .set({
            stockQuantity: sql`${products.stockQuantity} - ${line.quantity}`,
            updatedAt: new Date(),
          })
          .where(
            and(
              eq(products.id, line.productId),
              sql`${products.stockQuantity} >= ${line.quantity}`,
            ),
          )
          .returning({ id: products.id });

        if (updated.length === 0) {
          throw fail("OUT_OF_STOCK", `Stock race for ${line.name}`, 409, req.id);
        }

        await tx.insert(inventoryMovements).values({
          productId: line.productId,
          delta: -line.quantity,
          reason: "checkout_reserve",
          orderId: order.id,
          actorId: user.id,
        });
      }

      const [txn] = await tx
        .insert(transactions)
        .values({
          userId: user.id,
          orderId: order.id,
          amount: total.toFixed(2),
          currency: "INR",
          status: "pending",
          paymentMethod: "payu",
          description: `Order ${order.id}`,
        })
        .returning();

      await tx.delete(cartItems).where(eq(cartItems.userId, user.id));

      await tx.insert(activityLogs).values({
        userId: user.id,
        action: "checkout.create",
        entityType: "order",
        entityId: order.id,
        description: `Checkout created for ${total.toFixed(2)} INR`,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      });

      return { order, transaction: txn };
    });

    if (typeof idempotencyKey === "string" && idempotencyKey) {
      await ctx.db.insert(idempotencyKeys).values({
        key: idempotencyKey,
        userId: user.id,
        requestPath: "/api/v1/checkout",
        responseBody: result,
        statusCode: 200,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
    }

    return ok(result, req.id);
  });
}
