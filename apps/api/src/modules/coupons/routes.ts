import { eq } from "drizzle-orm";
import { coupons } from "@riyanshamrit/database";
import { couponCreateSchema } from "@riyanshamrit/validation";
import type { AppInstance, RouteCtx } from "../../lib/http.js";
import { fail, ok, requirePermission, requireUser } from "../../lib/http.js";

export async function registerCouponRoutes(app: AppInstance, ctx: RouteCtx) {
  app.get("/api/v1/admin/coupons", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    requireUser(req);
    requirePermission(req.permissions, "coupons.read");
    const items = await ctx.db.select().from(coupons);
    return ok({ items }, req.id);
  });

  app.post("/api/v1/admin/coupons", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    requireUser(req);
    requirePermission(req.permissions, "coupons.create");
    const body = couponCreateSchema.parse(req.body);
    const [created] = await ctx.db
      .insert(coupons)
      .values({
        code: body.code.toUpperCase(),
        description: body.description,
        discountType: body.discountType,
        discountValue: String(body.discountValue),
        minOrderAmount:
          body.minOrderAmount != null ? String(body.minOrderAmount) : null,
        maxRedemptions: body.maxRedemptions,
        isActive: body.isActive ?? true,
      })
      .returning();
    return ok(created, req.id);
  });

  app.get<{ Params: { code: string } }>(
    "/api/v1/coupons/:code",
    async (req) => {
      if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
      const [coupon] = await ctx.db
        .select()
        .from(coupons)
        .where(eq(coupons.code, req.params.code.toUpperCase()))
        .limit(1);
      if (!coupon || !coupon.isActive) {
        throw fail("NOT_FOUND", "Coupon not found", 404, req.id);
      }
      return ok(coupon, req.id);
    },
  );
}
