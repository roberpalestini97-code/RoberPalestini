// Exercises the Upstash store against a minimal fake of the Upstash REST API.
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const http = require("http");

const hash = new Map();
const keys = new Map();
const commands = [];

function run([cmd, ...args]) {
  commands.push(cmd);
  switch (cmd.toLowerCase()) {
    case "hgetall":
      return [...hash.entries()].flat().map(String);
    case "hincrby": {
      const [, field, by] = args;
      const next = (hash.get(field) || 0) + Number(by);
      hash.set(field, next);
      return next;
    }
    case "set": {
      const [key] = args;
      const nx = args.map((a) => String(a).toLowerCase()).includes("nx");
      if (nx && keys.has(key)) return null;
      keys.set(key, args[1]);
      return "OK";
    }
    default:
      throw new Error(`unexpected command ${cmd}`);
  }
}

let fake;
before(async () => {
  fake = http.createServer((req, res) => {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      assert.equal(req.headers.authorization, "Bearer test-token");
      const parsed = JSON.parse(body);
      // The client asks for base64-encoded strings, as the real API supports.
      const b64 = req.headers["upstash-encoding"] === "base64";
      const enc = (v) =>
        Array.isArray(v)
          ? v.map(enc)
          : b64 && typeof v === "string" && v !== "OK"
          ? Buffer.from(v).toString("base64")
          : v;
      const out = Array.isArray(parsed[0])
        ? parsed.map((c) => ({ result: enc(run(c)) }))
        : { result: enc(run(parsed)) };
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(out));
    });
  });
  await new Promise((r) => fake.listen(0, r));
  process.env.KV_REST_API_URL = `http://127.0.0.1:${fake.address().port}`;
  process.env.KV_REST_API_TOKEN = "test-token";
});

after(() => {
  fake.close();
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
});

test("redis store increments, dedupes and reads counts", async () => {
  const { getLikesStore, resetLikesStore } = require("../lib/likesStore");
  resetLikesStore();
  const store = getLikesStore();
  assert.equal(store.kind, "redis");

  assert.equal(await store.firstTime("solquerandi", "v1"), true);
  assert.equal(await store.incr("solquerandi"), 1);
  assert.equal(await store.firstTime("solquerandi", "v1"), false);
  assert.equal(await store.firstTime("solquerandi", "v2"), true);
  assert.equal(await store.incr("solquerandi"), 2);

  assert.deepEqual(await store.all(), { solquerandi: 2 });
  assert.ok(commands.includes("hincrby"));
});
