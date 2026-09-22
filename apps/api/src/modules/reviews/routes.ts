import { eq } from "drizzle-orm";
import { reviews } from "@riyanshamrit/database";
import { reviewCreateSchema } from "@riyanshamrit/validation";
import { and } from "drizzle-orm";
import type { AppInstance, RouteCtx } from "../../lib/http.js";
import { fail, ok, requirePermission, requireUser } from "../../lib/http.js";

export async function registerReviewRoutes(app: AppInstance, ctx: RouteCtx) {
  app.get<{ Params: { productId: string } }>(
    "/api/v1/products/:productId/reviews",
    async (req) => {
      if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
      const items = await ctx.db
        .select()
        .from(reviews)
        .where(
          and(
            eq(reviews.productId, req.params.productId),
            eq(reviews.isApproved, true),
          ),
        );
      return ok({ items }, req.id);
    },
  );

  app.post("/api/v1/reviews", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    const user = requireUser(req);
    const body = reviewCreateSchema.parse(req.body);
    const [created] = await ctx.db
      .insert(reviews)
      .values({
        productId: body.productId,
        userId: user.id,
        rating: body.rating,
        title: body.title,
        body: body.body,
        isApproved: false,
      })
      .returning();
    return ok(created, req.id);
  });

  app.patch<{ Params: { id: string } }>(
    "/api/v1/admin/reviews/:id/approve",
    async (req) => {
      if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
      requireUser(req);
      requirePermission(req.permissions, "products.update");
      const [updated] = await ctx.db
        .update(reviews)
        .set({ isApproved: true })
        .where(eq(reviews.id, req.params.id))
        .returning();
      if (!updated) throw fail("NOT_FOUND", "Review not found", 404, req.id);
      return ok(updated, req.id);
    },
  );
}
