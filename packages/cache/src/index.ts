import { Redis } from "@upstash/redis";

const l1 = new Map<string, { value: unknown; expiresAt: number }>();

export function createRedis(url?: string, token?: string) {
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export function ttlWithJitter(baseSeconds: number, jitterSeconds = 30) {
  return baseSeconds + Math.floor(Math.random() * jitterSeconds);
}

export async function cacheGet<T>(
  redis: Redis | null,
  key: string,
): Promise<T | null> {
  const now = Date.now();
  const local = l1.get(key);
  if (local && local.expiresAt > now) return local.value as T;
  if (!redis) return null;
  const value = await redis.get<T>(key);
  return value ?? null;
}

export async function cacheSet(
  redis: Redis | null,
  key: string,
  value: unknown,
  ttlSeconds: number,
) {
  const ttl = ttlWithJitter(ttlSeconds);
  l1.set(key, { value, expiresAt: Date.now() + ttl * 1000 });
  if (!redis) return;
  await redis.set(key, value, { ex: ttl });
}

export async function cacheSetNegative(
  redis: Redis | null,
  key: string,
  ttlSeconds = 60,
) {
  await cacheSet(redis, key, { __miss: true }, ttlSeconds);
}

export function isNegativeCache(value: unknown): boolean {
  return Boolean(value && typeof value === "object" && "__miss" in (value as object));
}

export async function withStampedeLock<T>(
  redis: Redis | null,
  lockKey: string,
  ttlSeconds: number,
  builder: () => Promise<T>,
): Promise<T> {
  if (!redis) return builder();
  const got = await redis.set(lockKey, "1", { nx: true, ex: 15 });
  if (got) {
    try {
      return await builder();
    } finally {
      await redis.del(lockKey);
    }
  }
  await new Promise((r) => setTimeout(r, 50));
  return builder();
}

export async function rateLimit(
  redis: Redis | null,
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<{ allowed: boolean; remaining: number }> {
  if (!redis) return { allowed: true, remaining: limit };
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, windowSeconds);
  return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
}
