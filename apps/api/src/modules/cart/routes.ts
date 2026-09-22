import { and, eq } from "drizzle-orm";
import { cartItems, products } from "@riyanshamrit/database";
import { cartUpsertSchema } from "@riyanshamrit/validation";
import type { AppInstance, RouteCtx } from "../../lib/http.js";
import { fail, ok, requireUser } from "../../lib/http.js";

export async function registerCartRoutes(app: AppInstance, ctx: RouteCtx) {
  app.get("/api/v1/cart/items", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    const user = requireUser(req);
    const items = await ctx.db
      .select({
        id: cartItems.id,
        quantity: cartItems.quantity,
        productId: cartItems.productId,
        productName: products.name,
        productSlug: products.slug,
        price: products.price,
        imageUrl: products.imageUrl,
        stockQuantity: products.stockQuantity,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, user.id));
    return ok({ items }, req.id);
  });

  app.post("/api/v1/cart/items", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    const user = requireUser(req);
    const body = cartUpsertSchema.parse(req.body);
    const [product] = await ctx.db
      .select()
      .from(products)
      .where(and(eq(products.id, body.productId), eq(products.isActive, true)))
      .limit(1);
    if (!product) throw fail("NOT_FOUND", "Product not found", 404, req.id);
    if ((product.stockQuantity ?? 0) < body.quantity) {
      throw fail("OUT_OF_STOCK", "Insufficient stock", 409, req.id);
    }

    const [existing] = await ctx.db
      .select()
      .from(cartItems)
      .where(
        and(eq(cartItems.userId, user.id), eq(cartItems.productId, body.productId)),
      )
      .limit(1);

    if (existing) {
      const [updated] = await ctx.db
        .update(cartItems)
        .set({ quantity: body.quantity, updatedAt: new Date() })
        .where(eq(cartItems.id, existing.id))
        .returning();
      return ok(updated, req.id);
    }

    const [created] = await ctx.db
      .insert(cartItems)
      .values({
        userId: user.id,
        productId: body.productId,
        quantity: body.quantity,
      })
      .returning();
    return ok(created, req.id);
  });

  app.delete<{ Params: { productId: string } }>(
    "/api/v1/cart/items/:productId",
    async (req) => {
      if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
      const user = requireUser(req);
      await ctx.db
        .delete(cartItems)
        .where(
          and(
            eq(cartItems.userId, user.id),
            eq(cartItems.productId, req.params.productId),
          ),
        );
      return ok({ deleted: true }, req.id);
    },
  );
}
