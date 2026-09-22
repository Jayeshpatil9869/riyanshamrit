import { eq } from "drizzle-orm";
import { coupons } from "@riyanshamrit/database";
import { couponCreateSchema } from "@riyanshamrit/validation";
import { createSupabaseUserClient } from "@riyanshamrit/auth";
import type { AppInstance, RouteCtx } from "../../lib/http.js";
import { fail, ok, requirePermission, requireUser } from "../../lib/http.js";

function userClient(ctx: RouteCtx, req: { headers: { authorization?: string } }) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return null;
  const token = auth.slice("Bearer ".length).trim();
  const url = process.env.SUPABASE_URL ?? "";
  const anon = process.env.SUPABASE_ANON_KEY ?? "";
  if (!token || !url || !anon) return null;
  return createSupabaseUserClient(url, anon, token);
}

export async function registerCouponRoutes(app: AppInstance, ctx: RouteCtx) {
  app.get("/api/v1/admin/coupons", async (req) => {
    requireUser(req);
    requirePermission(req.permissions, "coupons.read");
    if (ctx.db) {
      const items = await ctx.db.select().from(coupons);
      return ok({ items }, req.id);
    }
    const sb = userClient(ctx, req);
    if (!sb) throw fail("DB_UNAVAILABLE", "Database not configured", 503, req.id);
    const { data, error } = await sb.from("coupons").select("*").order("created_at", { ascending: false });
    if (error) throw fail("QUERY_FAILED", error.message, 500, req.id);
    return ok(
      {
        items: (data ?? []).map((c) => ({
          id: c.id,
          code: c.code,
          description: c.description,
          discountType: c.discount_type,
          discountValue: c.discount_value,
          minOrderAmount: c.min_order_amount,
          maxRedemptions: c.max_redemptions,
          redemptionCount: c.redemption_count,
          isActive: c.is_active,
          endsAt: c.ends_at,
        })),
      },
      req.id,
    );
  });

  app.post("/api/v1/admin/coupons", async (req) => {
    requireUser(req);
    requirePermission(req.permissions, "coupons.create");
    const body = couponCreateSchema.parse(req.body);
    const discountType =
      body.discountType === "percentage" ? "percent" : body.discountType;
    if (ctx.db) {
      const [created] = await ctx.db
        .insert(coupons)
        .values({
          code: body.code.toUpperCase(),
          description: body.description,
          discountType,
          discountValue: String(body.discountValue),
          minOrderAmount:
            body.minOrderAmount != null ? String(body.minOrderAmount) : null,
          maxRedemptions: body.maxRedemptions,
          isActive: body.isActive ?? true,
        })
        .returning();
      return ok(created, req.id);
    }
    const sb = userClient(ctx, req);
    if (!sb) throw fail("DB_UNAVAILABLE", "Database not configured", 503, req.id);
    const { data, error } = await sb
      .from("coupons")
      .insert({
        code: body.code.toUpperCase(),
        description: body.description,
        discount_type: discountType,
        discount_value: body.discountValue,
        min_order_amount: body.minOrderAmount ?? null,
        max_redemptions: body.maxRedemptions,
        is_active: body.isActive ?? true,
      })
      .select()
      .single();
    if (error || !data) throw fail("QUERY_FAILED", error?.message ?? "Create failed", 500, req.id);
    return ok(
      {
        id: data.id,
        code: data.code,
        description: data.description,
        discountType: data.discount_type,
        discountValue: data.discount_value,
        minOrderAmount: data.min_order_amount,
        maxRedemptions: data.max_redemptions,
        redemptionCount: data.redemption_count,
        isActive: data.is_active,
        endsAt: data.ends_at,
      },
      req.id,
    );
  });

  app.get<{ Params: { code: string } }>(
    "/api/v1/coupons/:code",
    async (req) => {
      if (ctx.db) {
        const [coupon] = await ctx.db
          .select()
          .from(coupons)
          .where(eq(coupons.code, req.params.code.toUpperCase()))
          .limit(1);
        if (!coupon || !coupon.isActive) {
          throw fail("NOT_FOUND", "Coupon not found", 404, req.id);
        }
        return ok(coupon, req.id);
      }
      const sb = userClient(ctx, req) ?? ctx.supabaseAnon;
      if (!sb) throw fail("DB_UNAVAILABLE", "Database not configured", 503, req.id);
      const { data } = await sb
        .from("coupons")
        .select("*")
        .eq("code", req.params.code.toUpperCase())
        .eq("is_active", true)
        .maybeSingle();
      if (!data) throw fail("NOT_FOUND", "Coupon not found", 404, req.id);
      return ok(data, req.id);
    },
  );
}
