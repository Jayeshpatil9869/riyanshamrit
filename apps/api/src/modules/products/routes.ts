import { and, desc, eq, lt } from "drizzle-orm";
import { categories, products } from "@riyanshamrit/database";
import { cursorQuerySchema } from "@riyanshamrit/validation";
import {
  cacheGet,
  cacheSet,
  cacheSetNegative,
  isNegativeCache,
  withStampedeLock,
} from "@riyanshamrit/cache";
import type { AppInstance, RouteCtx } from "../../lib/http.js";
import { fail, ok } from "../../lib/http.js";

export async function registerProductRoutes(app: AppInstance, ctx: RouteCtx) {
  app.get("/api/v1/products", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    const query = cursorQuerySchema.parse(req.query);
    const cacheKey = `cache:products:list:${query.cursor ?? "start"}:${query.limit}`;
    const cached = await cacheGet<unknown>(ctx.redis, cacheKey);
    if (cached && !isNegativeCache(cached)) return ok(cached, req.id);

    const rows = await withStampedeLock(
      ctx.redis,
      `lock:${cacheKey}`,
      10,
      async () => {
        const conditions = [eq(products.isActive, true)];
        if (query.cursor) {
          conditions.push(lt(products.createdAt, new Date(query.cursor)));
        }
        return ctx.db!
          .select({
            id: products.id,
            name: products.name,
            slug: products.slug,
            description: products.description,
            price: products.price,
            compareAtPrice: products.compareAtPrice,
            imageUrl: products.imageUrl,
            images: products.images,
            stockQuantity: products.stockQuantity,
            isFeatured: products.isFeatured,
            categoryId: products.categoryId,
            createdAt: products.createdAt,
            categorySlug: categories.slug,
            categoryName: categories.name,
          })
          .from(products)
          .leftJoin(categories, eq(products.categoryId, categories.id))
          .where(and(...conditions))
          .orderBy(desc(products.createdAt))
          .limit(query.limit + 1);
      },
    );

    const hasMore = rows.length > query.limit;
    const items = hasMore ? rows.slice(0, query.limit) : rows;
    const nextCursor =
      hasMore && items.at(-1)?.createdAt
        ? new Date(items.at(-1)!.createdAt!).toISOString()
        : null;
    const payload = { items, nextCursor };
    await cacheSet(ctx.redis, cacheKey, payload, 60);
    return ok(payload, req.id);
  });

  app.get<{ Params: { slug: string } }>(
    "/api/v1/products/:slug",
    async (req) => {
      if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
      const { slug } = req.params;
      const cacheKey = `cache:product:slug:${slug}`;
      const cached = await cacheGet<unknown>(ctx.redis, cacheKey);
      if (isNegativeCache(cached)) {
        throw fail("NOT_FOUND", "Product not found", 404, req.id);
      }
      if (cached) return ok(cached, req.id);

      const [row] = await ctx.db
        .select({
          id: products.id,
          name: products.name,
          slug: products.slug,
          description: products.description,
          price: products.price,
          compareAtPrice: products.compareAtPrice,
          imageUrl: products.imageUrl,
          images: products.images,
          stockQuantity: products.stockQuantity,
          isFeatured: products.isFeatured,
          isActive: products.isActive,
          categoryId: products.categoryId,
          categorySlug: categories.slug,
          categoryName: categories.name,
        })
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .where(and(eq(products.slug, slug), eq(products.isActive, true)))
        .limit(1);

      if (!row) {
        await cacheSetNegative(ctx.redis, cacheKey, 60);
        throw fail("NOT_FOUND", "Product not found", 404, req.id);
      }
      await cacheSet(ctx.redis, cacheKey, row, 120);
      return ok(row, req.id);
    },
  );
}
