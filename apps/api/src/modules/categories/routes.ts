import { eq } from "drizzle-orm";
import { categories, products } from "@riyanshamrit/database";
import { cacheGet, cacheSet } from "@riyanshamrit/cache";
import type { AppInstance, RouteCtx } from "../../lib/http.js";
import { fail, ok } from "../../lib/http.js";

export async function registerCategoryRoutes(app: AppInstance, ctx: RouteCtx) {
  app.get("/api/v1/categories", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    const cacheKey = "cache:nav:categories";
    const cached = await cacheGet<unknown>(ctx.redis, cacheKey);
    if (cached) return ok(cached, req.id);
    const items = await ctx.db.select().from(categories).orderBy(categories.name);
    await cacheSet(ctx.redis, cacheKey, items, 300);
    return ok({ items }, req.id);
  });

  app.get<{ Params: { slug: string } }>(
    "/api/v1/categories/:slug",
    async (req) => {
      if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
      const [category] = await ctx.db
        .select()
        .from(categories)
        .where(eq(categories.slug, req.params.slug))
        .limit(1);
      if (!category) throw fail("NOT_FOUND", "Category not found", 404, req.id);
      const items = await ctx.db
        .select()
        .from(products)
        .where(eq(products.categoryId, category.id));
      return ok({ category, items }, req.id);
    },
  );
}
