# Redis Architecture (Upstash)

Redis is **not** the source of truth. Postgres (`iwvrjjgjxxtlvvbdbytb`) is.

## Namespaces

| Prefix | Use |
|--------|-----|
| `cache:*` | Response/entity cache |
| `rate:*` | Rate limits |
| `lock:*` | Stampede / rebuild locks |
| `session:*` | Short-lived security helpers (not full sessions) |

## Hot keys

Candidates: `cache:homepage:featured`, `cache:nav:categories`, `cache:seo:org`.  
Pattern: L1 in-process (short TTL) → L2 Upstash → Postgres. Event invalidation on admin write.

## Protections

| Problem | Mitigation |
|---------|------------|
| Cache penetration | Negative cache `cache:product:miss:{slug}` short TTL |
| Avalanche | `baseTTL + randomJitter` |
| Stampede | `lock:rebuild:{key}`; one builder; others serve stale or wait |
| Big keys | No `allProducts` / `allOrders`; bound hash/list sizes |
| KEYS command | Forbidden on request path; SCAN for admin scripts only |

## Failure modes

- Cache miss path: Fastify → Postgres
- Rate-limit Redis down: auth/admin **fail closed**; public catalog reads degrade open
- Orders/payments never depend on Redis for correctness

## Monitoring

Track hit ratio, latency, memory, evictions, hot/big keys via Upstash console + periodic admin script.
