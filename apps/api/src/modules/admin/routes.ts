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
import type { AppInstance, RouteCtx } from "../../lib/http.js";
import { fail, ok, requirePermission, requireUser } from "../../lib/http.js";

async function audit(
  ctx: RouteCtx,
  userId: string,
  action: string,
  entityType: string,
  entityId: string,
  description: string,
  req: { ip: string; headers: Record<string, unknown> },
) {
  if (!ctx.db) return;
  await ctx.db.insert(activityLogs).values({
    userId,
    action,
    entityType,
    entityId,
    description,
    ipAddress: req.ip,
    userAgent: String(req.headers["user-agent"] ?? ""),
  });
}

export async function registerAdminRoutes(app: AppInstance, ctx: RouteCtx) {
  app.get("/api/v1/admin/dashboard", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    requireUser(req);
    requirePermission(req.permissions, "analytics.read");

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
  });

  app.get("/api/v1/admin/products", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    requireUser(req);
    requirePermission(req.permissions, "products.read");
    const query = cursorQuerySchema.parse(req.query);
    const items = await ctx.db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt))
      .limit(query.limit);
    return ok({ items }, req.id);
  });

  app.post("/api/v1/admin/products", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    const user = requireUser(req);
    requirePermission(req.permissions, "products.create");
    const body = productCreateSchema.parse(req.body);
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
  });

  app.patch<{ Params: { id: string } }>(
    "/api/v1/admin/products/:id",
    async (req) => {
      if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
      const user = requireUser(req);
      requirePermission(req.permissions, "products.update");
      const body = productUpdateSchema.parse(req.body);
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
    },
  );

  app.delete<{ Params: { id: string } }>(
    "/api/v1/admin/products/:id",
    async (req) => {
      if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
      const user = requireUser(req);
      requirePermission(req.permissions, "products.delete");
      const [updated] = await ctx.db
        .update(products)
        .set({ isActive: false, updatedAt: new Date() })
        .where(eq(products.id, req.params.id))
        .returning();
      if (!updated) throw fail("NOT_FOUND", "Product not found", 404, req.id);
      await audit(ctx, user.id, "product.deactivate", "product", updated.id, updated.name, req);
      return ok(updated, req.id);
    },
  );

  app.get("/api/v1/admin/categories", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    requireUser(req);
    requirePermission(req.permissions, "products.read");
    const items = await ctx.db.select().from(categories).orderBy(categories.name);
    return ok({ items }, req.id);
  });

  app.post("/api/v1/admin/categories", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    const user = requireUser(req);
    requirePermission(req.permissions, "products.create");
    const body = categoryCreateSchema.parse(req.body);
    const [created] = await ctx.db.insert(categories).values(body).returning();
    await audit(ctx, user.id, "category.create", "category", created.id, created.name, req);
    return ok(created, req.id);
  });

  app.get("/api/v1/admin/orders", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    requireUser(req);
    requirePermission(req.permissions, "orders.read");
    const query = cursorQuerySchema.parse(req.query);
    const items = await ctx.db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(query.limit);
    return ok({ items }, req.id);
  });

  app.patch<{ Params: { id: string } }>(
    "/api/v1/admin/orders/:id",
    async (req) => {
      if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
      const user = requireUser(req);
      requirePermission(req.permissions, "orders.update");
      const body = orderStatusSchema.parse(req.body);
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
    },
  );

  app.get("/api/v1/admin/customers", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    requireUser(req);
    requirePermission(req.permissions, "customers.read");
    const query = cursorQuerySchema.parse(req.query);
    const items = await ctx.db
      .select()
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(query.limit);
    return ok({ items }, req.id);
  });

  app.get("/api/v1/admin/transactions", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    requireUser(req);
    requirePermission(req.permissions, "orders.read");
    const items = await ctx.db
      .select()
      .from(transactions)
      .orderBy(desc(transactions.createdAt))
      .limit(50);
    return ok({ items }, req.id);
  });

  app.get("/api/v1/admin/activity", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    requireUser(req);
    requirePermission(req.permissions, "analytics.read");
    const items = await ctx.db
      .select()
      .from(activityLogs)
      .orderBy(desc(activityLogs.createdAt))
      .limit(100);
    return ok({ items }, req.id);
  });
}
