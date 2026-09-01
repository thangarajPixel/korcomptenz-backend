const buckets = new Map<string, number[]>();

function clientIp(ctx: { request: { ip?: string; headers: { [key: string]: unknown } } }) {
  const forwarded = ctx.request.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return ctx.request.ip || "unknown";
}

function allow(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const windowStart = now - windowMs;
  const timestamps = (buckets.get(key) ?? []).filter((t) => t > windowStart);
  if (timestamps.length >= limit) {
    buckets.set(key, timestamps);
    return false;
  }
  timestamps.push(now);
  buckets.set(key, timestamps);
  return true;
}

export default () => {
  return async (ctx, next) => {
    const path = ctx.request.path as string;

    if (path.startsWith("/api/global-search")) {
      const ip = clientIp(ctx);
      if (!allow(`search:${ip}`, 10, 60_000)) {
        ctx.status = 429;
        ctx.body = { error: "Too many requests" };
        return;
      }
    }

    if (path.startsWith("/api/sitemap")) {
      const ip = clientIp(ctx);
      if (!allow(`sitemap:${ip}`, 20, 60_000)) {
        ctx.status = 429;
        ctx.body = { error: "Too many requests" };
        return;
      }
    }

    await next();
  };
};
