import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import formbody from "@fastify/formbody";
import { randomUUID } from "node:crypto";
import { createDb } from "@riyanshamrit/database";
import {
  createSupabaseAdmin,
  createSupabaseAnon,
  loadPermissionSet,
  verifyBearerUser,
} from "@riyanshamrit/auth";
import { createRedis } from "@riyanshamrit/cache";
import { createLogger } from "@riyanshamrit/logger";
import { PaymentService, PayUProvider } from "@riyanshamrit/payments";
import { registerHealthRoutes } from "./modules/health/routes.js";
import { registerProductRoutes } from "./modules/products/routes.js";
import { registerCategoryRoutes } from "./modules/categories/routes.js";
import { registerCartRoutes } from "./modules/cart/routes.js";
import { registerWishlistRoutes } from "./modules/wishlist/routes.js";
import { registerCheckoutRoutes } from "./modules/checkout/routes.js";
import { registerOrderRoutes } from "./modules/orders/routes.js";
import { registerPaymentRoutes } from "./modules/payments/routes.js";
import { registerAdminRoutes } from "./modules/admin/routes.js";
import { registerSeoRoutes } from "./modules/seo/routes.js";
import { registerReviewRoutes } from "./modules/reviews/routes.js";
import { registerCouponRoutes } from "./modules/coupons/routes.js";
import { registerMeRoutes } from "./modules/me/routes.js";

export type AppContext = Awaited<ReturnType<typeof buildApp>> extends {
  ctx: infer C;
}
  ? C
  : never;

export async function buildApp() {
  const logger = createLogger("api");
  const app = Fastify({
    logger: false,
    requestTimeout: 30_000,
    bodyLimit: 1_048_576,
    genReqId: () => randomUUID(),
  });

  const supabaseUrl = process.env.SUPABASE_URL ?? "";
  const anonKey = process.env.SUPABASE_ANON_KEY ?? "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? anonKey;
  const databaseUrl = process.env.DATABASE_URL ?? "";

  const db = databaseUrl ? createDb(databaseUrl) : null;
  const supabaseAdmin = supabaseUrl && serviceKey
    ? createSupabaseAdmin(supabaseUrl, serviceKey)
    : null;
  const supabaseAnon = supabaseUrl && anonKey
    ? createSupabaseAnon(supabaseUrl, anonKey)
    : null;
  const redis = createRedis(
    process.env.UPSTASH_REDIS_REST_URL,
    process.env.UPSTASH_REDIS_REST_TOKEN,
  );

  const payuKey = process.env.PAYU_MERCHANT_KEY;
  const payuSalt = process.env.PAYU_MERCHANT_SALT;
  const payments =
    payuKey && payuSalt
      ? new PaymentService(
          new PayUProvider({
            merchantKey: payuKey,
            merchantSalt: payuSalt,
            baseUrl: process.env.PAYU_BASE_URL ?? "https://test.payu.in",
          }),
        )
      : null;

  const ctx = {
    db,
    redis,
    supabaseAdmin,
    supabaseAnon,
    payments,
    logger,
    appUrl: process.env.APP_URL ?? "http://localhost:3000",
  };

  await app.register(cors, {
    origin: [
      process.env.APP_URL ?? "http://localhost:3000",
      process.env.ADMIN_URL ?? "http://localhost:3050",
      "http://localhost:3050",
      "http://127.0.0.1:3050",
    ],
    credentials: true,
  });
  await app.register(helmet);
  await app.register(formbody);

  app.addHook("onRequest", async (req, reply) => {
    reply.header("x-request-id", req.id);
  });

  app.decorateRequest("user", null);
  // Fastify forbids decorating with reference types directly — use getter/setter.
  app.decorateRequest("permissions", {
    getter(this: { _permissions?: Set<string> }) {
      return this._permissions ?? new Set<string>();
    },
    setter(this: { _permissions?: Set<string> }, value: Set<string>) {
      this._permissions = value;
    },
  });

  app.addHook("preHandler", async (req) => {
    if (!supabaseAnon) {
      req.user = null;
      req.permissions = new Set();
      return;
    }
    const user = await verifyBearerUser(
      supabaseAnon,
      req.headers.authorization,
    );
    req.user = user;
    if (user && db) {
      req.permissions = await loadPermissionSet(db, user.id);
    } else {
      req.permissions = new Set();
    }
  });

  app.setErrorHandler((err, req, reply) => {
    logger.error({ err, requestId: req.id }, "request failed");
    const error = err as Error & { statusCode?: number };
    const status = error.statusCode ?? 500;
    reply.status(status).send({
      success: false,
      error: {
        code: status === 400 ? "BAD_REQUEST" : "INTERNAL_ERROR",
        message:
          status >= 500
            ? "Something went wrong"
            : error.message || "Request failed",
        requestId: req.id,
      },
    });
  });

  await registerHealthRoutes(app, ctx);
  await registerProductRoutes(app, ctx);
  await registerCategoryRoutes(app, ctx);
  await registerMeRoutes(app, ctx);
  await registerCartRoutes(app, ctx);
  await registerWishlistRoutes(app, ctx);
  await registerCheckoutRoutes(app, ctx);
  await registerOrderRoutes(app, ctx);
  await registerPaymentRoutes(app, ctx);
  await registerAdminRoutes(app, ctx);
  await registerSeoRoutes(app, ctx);
  await registerReviewRoutes(app, ctx);
  await registerCouponRoutes(app, ctx);

  return { app, ctx };
}
