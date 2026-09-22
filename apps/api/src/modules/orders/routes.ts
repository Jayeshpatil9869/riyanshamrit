import { and, desc, eq } from "drizzle-orm";
import { orderItems, orders } from "@riyanshamrit/database";
import { cursorQuerySchema } from "@riyanshamrit/validation";
import type { AppInstance, RouteCtx } from "../../lib/http.js";
import { fail, ok, requireUser } from "../../lib/http.js";

export async function registerOrderRoutes(app: AppInstance, ctx: RouteCtx) {
  app.get("/api/v1/orders", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    const user = requireUser(req);
    const query = cursorQuerySchema.parse(req.query);
    const items = await ctx.db
      .select()
      .from(orders)
      .where(eq(orders.userId, user.id))
      .orderBy(desc(orders.createdAt))
      .limit(query.limit);
    return ok({ items, nextCursor: null }, req.id);
  });

  app.get<{ Params: { id: string } }>("/api/v1/orders/:id", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    const user = requireUser(req);
    const [order] = await ctx.db
      .select()
      .from(orders)
      .where(and(eq(orders.id, req.params.id), eq(orders.userId, user.id)))
      .limit(1);
    if (!order) throw fail("NOT_FOUND", "Order not found", 404, req.id);
    const items = await ctx.db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id));
    return ok({ order, items }, req.id);
  });
}
