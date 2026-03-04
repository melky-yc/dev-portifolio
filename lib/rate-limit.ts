const store = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 60 * 1000
const MAX_REQUESTS = 3

function prune() {
  const now = Date.now()
  for (const [key, value] of store.entries()) {
    if (value.resetAt < now) store.delete(key)
  }
}

export function checkRateLimit(identifier: string): { ok: boolean; remaining: number; resetIn: number } {
  prune()
  const now = Date.now()
  const entry = store.get(identifier)

  if (!entry) {
    store.set(identifier, { count: 1, resetAt: now + WINDOW_MS })
    return { ok: true, remaining: MAX_REQUESTS - 1, resetIn: WINDOW_MS }
  }

  if (now >= entry.resetAt) {
    store.set(identifier, { count: 1, resetAt: now + WINDOW_MS })
    return { ok: true, remaining: MAX_REQUESTS - 1, resetIn: WINDOW_MS }
  }

  entry.count += 1
  if (entry.count > MAX_REQUESTS) {
    return {
      ok: false,
      remaining: 0,
      resetIn: Math.max(0, entry.resetAt - now),
    }
  }

  return {
    ok: true,
    remaining: MAX_REQUESTS - entry.count,
    resetIn: entry.resetAt - now,
  }
}

export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  if (forwarded) return forwarded.split(",")[0].trim()
  if (realIp) return realIp
  return "unknown"
}
