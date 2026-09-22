import { and, eq } from "drizzle-orm";
import { products, wishlistItems } from "@riyanshamrit/database";
import { z } from "zod";
import type { AppInstance, RouteCtx } from "../../lib/http.js";
import { fail, ok, requireUser } from "../../lib/http.js";

const addSchema = z.object({ productId: z.string().uuid() });

export async function registerWishlistRoutes(app: AppInstance, ctx: RouteCtx) {
  app.get("/api/v1/wishlist/items", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    const user = requireUser(req);
    const items = await ctx.db
      .select({
        id: wishlistItems.id,
        productId: wishlistItems.productId,
        productName: products.name,
        productSlug: products.slug,
        price: products.price,
        imageUrl: products.imageUrl,
      })
      .from(wishlistItems)
      .innerJoin(products, eq(wishlistItems.productId, products.id))
      .where(eq(wishlistItems.userId, user.id));
    return ok({ items }, req.id);
  });

  app.post("/api/v1/wishlist/items", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    const user = requireUser(req);
    const body = addSchema.parse(req.body);
    const [created] = await ctx.db
      .insert(wishlistItems)
      .values({ userId: user.id, productId: body.productId })
      .onConflictDoNothing()
      .returning();
    return ok(created ?? { productId: body.productId }, req.id);
  });

  app.delete<{ Params: { productId: string } }>(
    "/api/v1/wishlist/items/:productId",
    async (req) => {
      if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
      const user = requireUser(req);
      await ctx.db
        .delete(wishlistItems)
        .where(
          and(
            eq(wishlistItems.userId, user.id),
            eq(wishlistItems.productId, req.params.productId),
          ),
        );
      return ok({ deleted: true }, req.id);
    },
  );
}
