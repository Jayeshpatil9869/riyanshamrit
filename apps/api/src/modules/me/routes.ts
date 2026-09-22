import { eq } from "drizzle-orm";
import { users } from "@riyanshamrit/database";
import { listRoleNames } from "@riyanshamrit/auth";
import type { AppInstance, RouteCtx } from "../../lib/http.js";
import { fail, ok, requireUser } from "../../lib/http.js";

export async function registerMeRoutes(app: AppInstance, ctx: RouteCtx) {
  app.get("/api/v1/me", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    const user = requireUser(req);
    const [profile] = await ctx.db
      .select()
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);
    const roleNames = await listRoleNames(ctx.db, user.id);
    return ok(
      {
        profile: profile ?? {
          id: user.id,
          email: user.email,
          fullName: user.user_metadata?.full_name ?? null,
        },
        roles: roleNames,
        permissions: [...req.permissions],
      },
      req.id,
    );
  });
}
