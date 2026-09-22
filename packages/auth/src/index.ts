import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import { and, eq, inArray } from "drizzle-orm";
import type { Database } from "@riyanshamrit/database";
import {
  permissions,
  rolePermissions,
  roles,
  userRoles,
} from "@riyanshamrit/database";

export function createSupabaseAdmin(url: string, serviceRoleKey: string) {
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function createSupabaseAnon(url: string, anonKey: string) {
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function verifyBearerUser(
  supabase: SupabaseClient,
  authorizationHeader: string | undefined,
): Promise<User | null> {
  if (!authorizationHeader?.startsWith("Bearer ")) return null;
  const token = authorizationHeader.slice("Bearer ".length).trim();
  if (!token) return null;
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}

export async function loadPermissionSet(
  db: Database,
  userId: string,
): Promise<Set<string>> {
  const rows = await db
    .select({ code: permissions.code })
    .from(userRoles)
    .innerJoin(roles, eq(userRoles.roleId, roles.id))
    .innerJoin(rolePermissions, eq(rolePermissions.roleId, roles.id))
    .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
    .where(eq(userRoles.userId, userId));

  return new Set(rows.map((r) => r.code));
}

export function hasPermission(
  granted: Set<string>,
  required: string | string[],
): boolean {
  const need = Array.isArray(required) ? required : [required];
  return need.every((code) => granted.has(code));
}

export async function assignRoleByName(
  db: Database,
  userId: string,
  roleName: string,
) {
  const [role] = await db.select().from(roles).where(eq(roles.name, roleName)).limit(1);
  if (!role) throw new Error(`Role not found: ${roleName}`);
  await db
    .insert(userRoles)
    .values({ userId, roleId: role.id })
    .onConflictDoNothing();
}

export async function listRoleNames(db: Database, userId: string) {
  const rows = await db
    .select({ name: roles.name })
    .from(userRoles)
    .innerJoin(roles, eq(userRoles.roleId, roles.id))
    .where(eq(userRoles.userId, userId));
  return rows.map((r) => r.name);
}

export { and, eq, inArray };
