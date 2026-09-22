import type { AppInstance, RouteCtx } from "../../lib/http.js";
import { ok } from "../../lib/http.js";

export async function registerHealthRoutes(app: AppInstance, ctx: RouteCtx) {
  app.get("/api/v1/health", async (req) =>
    ok(
      {
        status: "ok",
        db: Boolean(ctx.db),
        redis: Boolean(ctx.redis),
        payments: Boolean(ctx.payments),
      },
      req.id,
    ),
  );
}
