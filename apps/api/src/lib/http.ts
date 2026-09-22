import type { FastifyInstance } from "fastify";
import type { User, SupabaseClient } from "@supabase/supabase-js";
import type { Redis } from "@upstash/redis";
import { hasPermission } from "@riyanshamrit/auth";
import type { Database } from "@riyanshamrit/database";
import type { PaymentService } from "@riyanshamrit/payments";
import type { Logger } from "@riyanshamrit/logger";

export function ok<T>(data: T, requestId?: string) {
  return { success: true as const, data, requestId };
}

export function fail(
  code: string,
  message: string,
  statusCode: number,
  requestId?: string,
) {
  const err = new Error(message) as Error & { statusCode: number; code: string };
  err.statusCode = statusCode;
  err.code = code;
  (err as { requestId?: string }).requestId = requestId;
  return err;
}

export function requireUser(req: { user?: User | null }): User {
  if (!req.user) {
    throw fail("UNAUTHORIZED", "Authentication required", 401);
  }
  return req.user;
}

export function requirePermission(
  permissions: Set<string> | null | undefined,
  code: string | string[],
) {
  if (!permissions || !hasPermission(permissions, code)) {
    throw fail("FORBIDDEN", "Insufficient permissions", 403);
  }
}

export type RouteCtx = {
  db: Database | null;
  redis: Redis | null;
  supabaseAdmin: SupabaseClient | null;
  supabaseAnon: SupabaseClient | null;
  payments: PaymentService | null;
  logger: Logger;
  appUrl: string;
};

export type AppInstance = FastifyInstance;
