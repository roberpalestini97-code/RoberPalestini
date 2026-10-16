const { Redis } = require("@upstash/redis");

const KEY = "likes";
const DEDUPE_TTL = 60 * 60 * 24 * 30; // one like per visitor and item, per 30 days

// Upstash Redis over REST: works from serverless functions. Vercel's
// Upstash integration injects KV_REST_API_*; plain Upstash uses UPSTASH_*.
function redisStore(url, token) {
  const redis = new Redis({ url, token });
  return {
    kind: "redis",
    async all() {
      const counts = (await redis.hgetall(KEY)) || {};
      return Object.fromEntries(Object.entries(counts).map(([k, v]) => [k, Number(v)]));
    },
    async firstTime(id, visitor) {
      return (await redis.set(`liked:${id}:${visitor}`, 1, { nx: true, ex: DEDUPE_TTL })) === "OK";
    },
    async incr(id) {
      return Number(await redis.hincrby(KEY, id, 1));
    },
  };
}

// In-memory store for local development and tests.
function memoryStore() {
  const counts = new Map();
  const seen = new Set();
  return {
    kind: "memory",
    async all() {
      return Object.fromEntries(counts);
    },
    async firstTime(id, visitor) {
      const key = `${id}:${visitor}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    },
    async incr(id) {
      const next = (counts.get(id) || 0) + 1;
      counts.set(id, next);
      return next;
    },
  };
}

let cached;

// Returns a store, or null when likes are not configured in production.
function getLikesStore() {
  if (cached !== undefined) return cached;
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) cached = redisStore(url, token);
  else if (process.env.LIKES_STORE === "memory" || !process.env.VERCEL) cached = memoryStore();
  else cached = null;
  return cached;
}

// Tests only.
function resetLikesStore() {
  cached = undefined;
}

module.exports = { getLikesStore, resetLikesStore };
