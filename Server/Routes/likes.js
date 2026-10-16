const crypto = require("crypto");
const express = require("express");
const rateLimit = require("express-rate-limit");
const likeable = require("../data/likeable.json");
const { getLikesStore } = require("../lib/likesStore");

const router = express.Router();
const allowed = new Set(likeable);

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 40,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { status: 429, message: "Too many likes. Please slow down." },
});

// Visitors are identified by a salted hash of their IP: no raw IPs are stored.
const visitorId = (req) =>
  crypto
    .createHash("sha256")
    .update(`${process.env.LIKES_SALT || "portfolio-likes"}:${req.ip}`)
    .digest("hex")
    .slice(0, 32);

router.get("/", async (req, res) => {
  const store = getLikesStore();
  if (!store) return res.status(200).json({ status: 200, enabled: false, counts: {} });
  try {
    const counts = await store.all();
    res.set("Cache-Control", "public, max-age=0, s-maxage=10, stale-while-revalidate=60");
    return res.status(200).json({ status: 200, enabled: true, counts });
  } catch (err) {
    console.error("Likes: failed to read counts", err);
    return res.status(502).json({ status: 502, message: "Likes are unavailable." });
  }
});

router.post("/", limiter, async (req, res) => {
  const id = req.body && typeof req.body.id === "string" ? req.body.id : "";
  if (!allowed.has(id)) {
    return res.status(404).json({ status: 404, message: "Unknown item." });
  }

  const store = getLikesStore();
  if (!store) {
    return res.status(503).json({ status: 503, message: "Likes are not configured." });
  }

  try {
    const first = await store.firstTime(id, visitorId(req));
    if (!first) {
      const counts = await store.all();
      return res.status(200).json({ status: 200, id, count: counts[id] || 0, alreadyLiked: true });
    }
    const count = await store.incr(id);
    return res.status(200).json({ status: 200, id, count });
  } catch (err) {
    console.error("Likes: failed to save like", err);
    return res.status(502).json({ status: 502, message: "Likes are unavailable." });
  }
});

module.exports = router;
