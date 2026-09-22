import type { User } from "@supabase/supabase-js";

declare module "fastify" {
  interface FastifyRequest {
    user: User | null;
    permissions: Set<string>;
    _permissions?: Set<string>;
  }
}

export {};
