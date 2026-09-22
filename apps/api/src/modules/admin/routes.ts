import { desc, eq, sql } from "drizzle-orm";
import {
  activityLogs,
  categories,
  orders,
  products,
  transactions,
  users,
} from "@riyanshamrit/database";
import {
  categoryCreateSchema,
  cursorQuerySchema,
  orderStatusSchema,
  productCreateSchema,
  productUpdateSchema,
} from "@riyanshamrit/validation";
import {
  createSupabaseUserClient,
  loadPermissionSet,
  loadPermissionSetViaRest,
} from "@riyanshamrit/auth";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { AppInstance, RouteCtx } from "../../lib/http.js";
import { fail, ok, requirePermission, requireUser } from "../../lib/http.js";

function bearerToken(authorization: string | undefined): string | null {
  if (!authorization?.startsWith("Bearer ")) return null;
  return authorization.slice("Bearer ".length).trim() || null;
}

function userClient(ctx: RouteCtx, req: { headers: { authorization?: string } }) {
  const token = bearerToken(req.headers.authorization);
  const url = process.env.SUPABASE_URL ?? "";
  const anon = process.env.SUPABASE_ANON_KEY ?? "";
  if (!token || !url || !anon) return null;
  return createSupabaseUserClient(url, anon, token);
}

async function audit(
  ctx: RouteCtx,
  userId: string,
  action: string,
  entityType: string,
  entityId: string,
  description: string,
  req: { ip: string; headers: Record<string, unknown> },
  sb?: SupabaseClient | null,
) {
  const row = {
    user_id: userId,
    action,
    entity_type: entityType,
    entity_id: entityId,
    description,
    ip_address: req.ip,
    user_agent: String(req.headers["user-agent"] ?? ""),
  };
  if (ctx.db) {
    await ctx.db.insert(activityLogs).values({
      userId,
      action,
      entityType,
      entityId,
      description,
      ipAddress: req.ip,
      userAgent: String(req.headers["user-agent"] ?? ""),
    });
    return;
  }
  if (sb) {
    await sb.from("activity_logs").insert(row);
  }
}

export async function registerAdminRoutes(app: AppInstance, ctx: RouteCtx) {
  app.post("/api/v1/admin/auth/login", async (req) => {
    if (!ctx.supabaseAnon) {
      throw fail("AUTH_UNAVAILABLE", "Auth not configured", 503, req.id);
    }
    const body = (req.body ?? {}) as { username?: string; password?: string };
    const username = String(body.username ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    if (!username || !password) {
      throw fail("BAD_REQUEST", "Username and password required", 400, req.id);
    }

    const email =
      username.includes("@")
        ? username
        : username === "admin"
          ? "admin@riyanshamrit.com"
          : `${username}@riyanshamrit.com`;

    const { data, error } = await ctx.supabaseAnon.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.session || !data.user) {
      throw fail("UNAUTHORIZED", "Invalid admin credentials", 401, req.id);
    }

    const permissions = ctx.db
      ? await loadPermissionSet(ctx.db, data.user.id)
      : await loadPermissionSetViaRest(ctx.supabaseAnon, data.user.id);

    if (![...permissions].some((p) => p.startsWith("products.") || p.startsWith("orders.") || p === "analytics.read")) {
      throw fail("FORBIDDEN", "Not an admin account", 403, req.id);
    }

    return ok(
      {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at,
        user: {
          id: data.user.id,
          email: data.user.email,
          name:
            (data.user.user_metadata?.full_name as string | undefined) ??
            "Administrator",
          role: "admin" as const,
        },
        permissions: [...permissions],
      },
      req.id,
    );
  });

  app.post("/api/v1/admin/auth/refresh", async (req) => {
    if (!ctx.supabaseAnon) {
      throw fail("AUTH_UNAVAILABLE", "Auth not configured", 503, req.id);
    }
    const body = (req.body ?? {}) as { refreshToken?: string };
    const refreshToken = String(body.refreshToken ?? "").trim();
    if (!refreshToken) {
      throw fail("BAD_REQUEST", "Refresh token required", 400, req.id);
    }

    const { data, error } = await ctx.supabaseAnon.auth.refreshSession({
      refresh_token: refreshToken,
    });
    if (error || !data.session || !data.user) {
      throw fail("UNAUTHORIZED", "Invalid or expired refresh token", 401, req.id);
    }

    const permissions = ctx.db
      ? await loadPermissionSet(ctx.db, data.user.id)
      : await loadPermissionSetViaRest(ctx.supabaseAnon, data.user.id);

    return ok(
      {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at,
        user: {
          id: data.user.id,
          email: data.user.email,
          name:
            (data.user.user_metadata?.full_name as string | undefined) ??
            "Administrator",
          role: "admin" as const,
        },
        permissions: [...permissions],
      },
      req.id,
    );
  });

  app.get("/api/v1/admin/me", async (req) => {
    const user = requireUser(req);
    return ok(
      {
        id: user.id,
        email: user.email,
        name:
          (user.user_metadata?.full_name as string | undefined) ??
          "Administrator",
        role: "admin" as const,
        permissions: [...(req.permissions ?? [])],
      },
      req.id,
    );
  });

  app.get("/api/v1/admin/dashboard", async (req) => {
    requireUser(req);
    requirePermission(req.permissions, "analytics.read");

    if (ctx.db) {
      const [productCount] = await ctx.db
        .select({ count: sql<number>`count(*)::int` })
        .from(products);
      const [orderCount] = await ctx.db
        .select({ count: sql<number>`count(*)::int` })
        .from(orders);
      const [customerCount] = await ctx.db
        .select({ count: sql<number>`count(*)::int` })
        .from(users);
      const [revenue] = await ctx.db
        .select({
          total: sql<string>`coalesce(sum(${orders.totalAmount}), 0)`,
        })
        .from(orders)
        .where(eq(orders.status, "paid"));

      return ok(
        {
          products: productCount.count,
          orders: orderCount.count,
          customers: customerCount.count,
          paidRevenue: revenue.total,
        },
        req.id,
      );
    }

    const sb = userClient(ctx, req);
    if (!sb) throw fail("DB_UNAVAILABLE", "Database not configured", 503, req.id);
    const [p, o, c] = await Promise.all([
      sb.from("products").select("id", { count: "exact", head: true }),
      sb.from("orders").select("id", { count: "exact", head: true }),
      sb.from("users").select("id", { count: "exact", head: true }),
    ]);
    const paid = await sb.from("orders").select("total_amount").eq("status", "paid");
    const paidRevenue = (paid.data ?? []).reduce(
      (sum, row) => sum + Number(row.total_amount ?? 0),
      0,
    );
    return ok(
      {
        products: p.count ?? 0,
        orders: o.count ?? 0,
        customers: c.count ?? 0,
        paidRevenue: String(paidRevenue),
      },
      req.id,
    );
  });

  app.get("/api/v1/admin/products", async (req) => {
    requireUser(req);
    requirePermission(req.permissions, "products.read");
    const query = cursorQuerySchema.parse(req.query);

    if (ctx.db) {
      const items = await ctx.db
        .select()
        .from(products)
        .orderBy(desc(products.createdAt))
        .limit(query.limit);
      return ok({ items }, req.id);
    }

    const sb = userClient(ctx, req);
    if (!sb) throw fail("DB_UNAVAILABLE", "Database not configured", 503, req.id);
    const { data, error } = await sb
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(query.limit);
    if (error) throw fail("QUERY_FAILED", error.message, 500, req.id);
    return ok(
      {
        items: (data ?? []).map(mapProductRow),
      },
      req.id,
    );
  });

  app.post("/api/v1/admin/products", async (req) => {
    const user = requireUser(req);
    requirePermission(req.permissions, "products.create");
    const body = productCreateSchema.parse(req.body);

    if (ctx.db) {
      const [created] = await ctx.db
        .insert(products)
        .values({
          name: body.name,
          slug: body.slug,
          description: body.description,
          price: String(body.price),
          compareAtPrice:
            body.compareAtPrice != null ? String(body.compareAtPrice) : null,
          categoryId: body.categoryId ?? null,
          imageUrl: body.imageUrl ?? null,
          images: body.images ?? [],
          stockQuantity: body.stockQuantity,
          isFeatured: body.isFeatured ?? false,
          isActive: body.isActive ?? true,
        })
        .returning();
      await audit(ctx, user.id, "product.create", "product", created.id, created.name, req);
      return ok(created, req.id);
    }

    const sb = userClient(ctx, req);
    if (!sb) throw fail("DB_UNAVAILABLE", "Database not configured", 503, req.id);
    const { data, error } = await sb
      .from("products")
      .insert({
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: body.price,
        compare_at_price: body.compareAtPrice ?? null,
        category_id: body.categoryId ?? null,
        image_url: body.imageUrl ?? null,
        images: body.images ?? [],
        stock_quantity: body.stockQuantity,
        is_featured: body.isFeatured ?? false,
        is_active: body.isActive ?? true,
      })
      .select()
      .single();
    if (error || !data) throw fail("QUERY_FAILED", error?.message ?? "Create failed", 500, req.id);
    await audit(ctx, user.id, "product.create", "product", data.id, data.name, req, sb);
    return ok(mapProductRow(data), req.id);
  });

  app.patch<{ Params: { id: string } }>(
    "/api/v1/admin/products/:id",
    async (req) => {
      const user = requireUser(req);
      requirePermission(req.permissions, "products.update");
      const body = productUpdateSchema.parse(req.body);

      if (ctx.db) {
        const [updated] = await ctx.db
          .update(products)
          .set({
            ...(body.name != null ? { name: body.name } : {}),
            ...(body.slug != null ? { slug: body.slug } : {}),
            ...(body.description != null ? { description: body.description } : {}),
            ...(body.price != null ? { price: String(body.price) } : {}),
            ...(body.compareAtPrice != null
              ? { compareAtPrice: String(body.compareAtPrice) }
              : {}),
            ...(body.categoryId !== undefined ? { categoryId: body.categoryId } : {}),
            ...(body.imageUrl !== undefined ? { imageUrl: body.imageUrl } : {}),
            ...(body.images != null ? { images: body.images } : {}),
            ...(body.stockQuantity != null
              ? { stockQuantity: body.stockQuantity }
              : {}),
            ...(body.isFeatured != null ? { isFeatured: body.isFeatured } : {}),
            ...(body.isActive != null ? { isActive: body.isActive } : {}),
            updatedAt: new Date(),
          })
          .where(eq(products.id, req.params.id))
          .returning();
        if (!updated) throw fail("NOT_FOUND", "Product not found", 404, req.id);
        await audit(ctx, user.id, "product.update", "product", updated.id, updated.name, req);
        return ok(updated, req.id);
      }

      const sb = userClient(ctx, req);
      if (!sb) throw fail("DB_UNAVAILABLE", "Database not configured", 503, req.id);
      const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (body.name != null) patch.name = body.name;
      if (body.slug != null) patch.slug = body.slug;
      if (body.description != null) patch.description = body.description;
      if (body.price != null) patch.price = body.price;
      if (body.compareAtPrice != null) patch.compare_at_price = body.compareAtPrice;
      if (body.categoryId !== undefined) patch.category_id = body.categoryId;
      if (body.imageUrl !== undefined) patch.image_url = body.imageUrl;
      if (body.images != null) patch.images = body.images;
      if (body.stockQuantity != null) patch.stock_quantity = body.stockQuantity;
      if (body.isFeatured != null) patch.is_featured = body.isFeatured;
      if (body.isActive != null) patch.is_active = body.isActive;

      const { data, error } = await sb
        .from("products")
        .update(patch)
        .eq("id", req.params.id)
        .select()
        .maybeSingle();
      if (error) throw fail("QUERY_FAILED", error.message, 500, req.id);
      if (!data) throw fail("NOT_FOUND", "Product not found", 404, req.id);
      await audit(ctx, user.id, "product.update", "product", data.id, data.name, req, sb);
      return ok(mapProductRow(data), req.id);
    },
  );

  app.delete<{ Params: { id: string } }>(
    "/api/v1/admin/products/:id",
    async (req) => {
      const user = requireUser(req);
      requirePermission(req.permissions, "products.delete");

      if (ctx.db) {
        const [updated] = await ctx.db
          .update(products)
          .set({ isActive: false, updatedAt: new Date() })
          .where(eq(products.id, req.params.id))
          .returning();
        if (!updated) throw fail("NOT_FOUND", "Product not found", 404, req.id);
        await audit(ctx, user.id, "product.deactivate", "product", updated.id, updated.name, req);
        return ok(updated, req.id);
      }

      const sb = userClient(ctx, req);
      if (!sb) throw fail("DB_UNAVAILABLE", "Database not configured", 503, req.id);
      const { data, error } = await sb
        .from("products")
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq("id", req.params.id)
        .select()
        .maybeSingle();
      if (error) throw fail("QUERY_FAILED", error.message, 500, req.id);
      if (!data) throw fail("NOT_FOUND", "Product not found", 404, req.id);
      await audit(ctx, user.id, "product.deactivate", "product", data.id, data.name, req, sb);
      return ok(mapProductRow(data), req.id);
    },
  );

  app.get("/api/v1/admin/categories", async (req) => {
    requireUser(req);
    requirePermission(req.permissions, "products.read");
    if (ctx.db) {
      const items = await ctx.db.select().from(categories).orderBy(categories.name);
      return ok({ items }, req.id);
    }
    const sb = userClient(ctx, req);
    if (!sb) throw fail("DB_UNAVAILABLE", "Database not configured", 503, req.id);
    const { data, error } = await sb.from("categories").select("*").order("name");
    if (error) throw fail("QUERY_FAILED", error.message, 500, req.id);
    return ok({ items: data ?? [] }, req.id);
  });

  app.post("/api/v1/admin/categories", async (req) => {
    const user = requireUser(req);
    requirePermission(req.permissions, "products.create");
    const body = categoryCreateSchema.parse(req.body);
    if (ctx.db) {
      const [created] = await ctx.db.insert(categories).values(body).returning();
      await audit(ctx, user.id, "category.create", "category", created.id, created.name, req);
      return ok(created, req.id);
    }
    const sb = userClient(ctx, req);
    if (!sb) throw fail("DB_UNAVAILABLE", "Database not configured", 503, req.id);
    const { data, error } = await sb.from("categories").insert(body).select().single();
    if (error || !data) throw fail("QUERY_FAILED", error?.message ?? "Create failed", 500, req.id);
    await audit(ctx, user.id, "category.create", "category", data.id, data.name, req, sb);
    return ok(data, req.id);
  });

  app.get("/api/v1/admin/orders", async (req) => {
    requireUser(req);
    requirePermission(req.permissions, "orders.read");
    const query = cursorQuerySchema.parse(req.query);
    if (ctx.db) {
      const items = await ctx.db
        .select()
        .from(orders)
        .orderBy(desc(orders.createdAt))
        .limit(query.limit);
      return ok({ items }, req.id);
    }
    const sb = userClient(ctx, req);
    if (!sb) throw fail("DB_UNAVAILABLE", "Database not configured", 503, req.id);
    const { data, error } = await sb
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(query.limit);
    if (error) throw fail("QUERY_FAILED", error.message, 500, req.id);
    return ok({ items: (data ?? []).map(mapOrderRow) }, req.id);
  });

  app.patch<{ Params: { id: string } }>(
    "/api/v1/admin/orders/:id",
    async (req) => {
      const user = requireUser(req);
      requirePermission(req.permissions, "orders.update");
      const body = orderStatusSchema.parse(req.body);
      if (ctx.db) {
        const [updated] = await ctx.db
          .update(orders)
          .set({ status: body.status, updatedAt: new Date() })
          .where(eq(orders.id, req.params.id))
          .returning();
        if (!updated) throw fail("NOT_FOUND", "Order not found", 404, req.id);
        await audit(
          ctx,
          user.id,
          "order.status",
          "order",
          updated.id,
          `status=${body.status}`,
          req,
        );
        return ok(updated, req.id);
      }
      const sb = userClient(ctx, req);
      if (!sb) throw fail("DB_UNAVAILABLE", "Database not configured", 503, req.id);
      const { data, error } = await sb
        .from("orders")
        .update({ status: body.status, updated_at: new Date().toISOString() })
        .eq("id", req.params.id)
        .select()
        .maybeSingle();
      if (error) throw fail("QUERY_FAILED", error.message, 500, req.id);
      if (!data) throw fail("NOT_FOUND", "Order not found", 404, req.id);
      await audit(
        ctx,
        user.id,
        "order.status",
        "order",
        data.id,
        `status=${body.status}`,
        req,
        sb,
      );
      return ok(mapOrderRow(data), req.id);
    },
  );

  app.get("/api/v1/admin/customers", async (req) => {
    requireUser(req);
    requirePermission(req.permissions, "customers.read");
    const query = cursorQuerySchema.parse(req.query);
    if (ctx.db) {
      const items = await ctx.db
        .select()
        .from(users)
        .orderBy(desc(users.createdAt))
        .limit(query.limit);
      return ok({ items }, req.id);
    }
    const sb = userClient(ctx, req);
    if (!sb) throw fail("DB_UNAVAILABLE", "Database not configured", 503, req.id);
    const { data, error } = await sb
      .from("users")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(query.limit);
    if (error) throw fail("QUERY_FAILED", error.message, 500, req.id);
    return ok(
      {
        items: (data ?? []).map((u) => ({
          id: u.id,
          email: u.email,
          fullName: u.full_name,
          phone: u.phone,
          avatarUrl: u.avatar_url,
          createdAt: u.created_at,
          updatedAt: u.updated_at,
        })),
      },
      req.id,
    );
  });

  app.get("/api/v1/admin/transactions", async (req) => {
    requireUser(req);
    requirePermission(req.permissions, "orders.read");
    if (ctx.db) {
      const items = await ctx.db
        .select()
        .from(transactions)
        .orderBy(desc(transactions.createdAt))
        .limit(50);
      return ok({ items }, req.id);
    }
    const sb = userClient(ctx, req);
    if (!sb) throw fail("DB_UNAVAILABLE", "Database not configured", 503, req.id);
    const { data, error } = await sb
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw fail("QUERY_FAILED", error.message, 500, req.id);
    return ok({ items: data ?? [] }, req.id);
  });

  app.get("/api/v1/admin/activity", async (req) => {
    requireUser(req);
    requirePermission(req.permissions, "analytics.read");
    if (ctx.db) {
      const items = await ctx.db
        .select()
        .from(activityLogs)
        .orderBy(desc(activityLogs.createdAt))
        .limit(100);
      return ok({ items }, req.id);
    }
    const sb = userClient(ctx, req);
    if (!sb) throw fail("DB_UNAVAILABLE", "Database not configured", 503, req.id);
    const { data, error } = await sb
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw fail("QUERY_FAILED", error.message, 500, req.id);
    return ok(
      {
        items: (data ?? []).map((row) => ({
          id: row.id,
          userId: row.user_id,
          action: row.action,
          entityType: row.entity_type,
          entityId: row.entity_id,
          description: row.description,
          createdAt: row.created_at,
        })),
      },
      req.id,
    );
  });
}

function mapProductRow(row: Record<string, unknown>) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    price: row.price,
    compareAtPrice: row.compare_at_price ?? row.compareAtPrice,
    categoryId: row.category_id ?? row.categoryId,
    imageUrl: row.image_url ?? row.imageUrl,
    images: row.images ?? [],
    stockQuantity: row.stock_quantity ?? row.stockQuantity,
    isFeatured: row.is_featured ?? row.isFeatured,
    isActive: row.is_active ?? row.isActive,
    createdAt: row.created_at ?? row.createdAt,
    updatedAt: row.updated_at ?? row.updatedAt,
  };
}

function mapOrderRow(row: Record<string, unknown>) {
  return {
    id: row.id,
    userId: row.user_id ?? row.userId,
    totalAmount: row.total_amount ?? row.totalAmount,
    status: row.status,
    shippingAddress: row.shipping_address ?? row.shippingAddress,
    billingAddress: row.billing_address ?? row.billingAddress,
    notes: row.notes,
    payuTxnId: row.payu_txnid ?? row.payuTxnId,
    payuMihpayId: row.payu_mihpayid ?? row.payuMihpayId,
    payuStatus: row.payu_status ?? row.payuStatus,
    paidAt: row.paid_at ?? row.paidAt,
    createdAt: row.created_at ?? row.createdAt,
    updatedAt: row.updated_at ?? row.updatedAt,
  };
}
