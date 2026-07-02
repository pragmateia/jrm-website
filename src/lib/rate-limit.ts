/**
 * Minimal in-memory, fixed-window rate limiter for the public form API routes.
 *
 * Note: on Vercel this state is per serverless instance, so it is best-effort
 * — it deters naive scripted abuse but is not a hard guarantee. A durable
 * store (e.g. Upstash/KV) would be needed for strict limits.
 */

interface Bucket {
  count: number;
  windowStart: number;
}

const buckets = new Map<string, Bucket>();

// Cap map size so a spray of unique IPs can't grow memory unbounded
const MAX_BUCKETS = 5000;

/**
 * Returns true if the caller identified by `key` is within `limit` requests
 * per `windowMs` window, false if they should be rejected.
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart >= windowMs) {
    if (buckets.size >= MAX_BUCKETS) {
      // Drop expired buckets; if none expired, reset entirely (fail open)
      for (const [k, b] of buckets) {
        if (now - b.windowStart >= windowMs) buckets.delete(k);
      }
      if (buckets.size >= MAX_BUCKETS) buckets.clear();
    }
    buckets.set(key, { count: 1, windowStart: now });
    return true;
  }

  bucket.count += 1;
  return bucket.count <= limit;
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
