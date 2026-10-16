// Run with: npm test  (uses the in-memory likes store)
delete process.env.VERCEL;
delete process.env.KV_REST_API_URL;
delete process.env.UPSTASH_REDIS_REST_URL;

const { test, before, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const { resetLikesStore } = require("../lib/likesStore");
const app = require("../app");

let server;
let base;

before(async () => {
  server = app.listen(0);
  await new Promise((r) => server.once("listening", r));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());
beforeEach(() => resetLikesStore());

const like = (id, ip) =>
  fetch(`${base}/api/likes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
    body: JSON.stringify({ id }),
  });

const counts = async () => (await (await fetch(`${base}/api/likes`)).json()).counts;

test("counts likes per item, one per visitor", async () => {
  let res = await like("solquerandi", "10.1.0.1");
  assert.deepEqual(await res.json(), { status: 200, id: "solquerandi", count: 1 });

  res = await like("solquerandi", "10.1.0.2");
  assert.equal((await res.json()).count, 2);

  res = await like("solquerandi", "10.1.0.1");
  const body = await res.json();
  assert.equal(body.count, 2);
  assert.equal(body.alreadyLiked, true);

  assert.deepEqual(await counts(), { solquerandi: 2 });
});

test("rejects unknown ids", async () => {
  const res = await like("not-a-project", "10.1.0.3");
  assert.equal(res.status, 404);
  assert.deepEqual(await counts(), {});
});

test("every project id in the front end is likeable", async () => {
  const fs = require("fs");
  const path = require("path");
  const src = fs.readFileSync(path.join(__dirname, "../../src/data/projects.js"), "utf8");
  const ids = [...src.matchAll(/^\s{4}id: "([a-z0-9-]+)",$/gm)].map((m) => m[1]);
  const likeable = require("../data/likeable.json");
  assert.ok(ids.length >= 10);
  ids.forEach((id) => assert.ok(likeable.includes(id), `${id} missing from likeable.json`));
});

test("disabled on Vercel without Redis configured", async () => {
  process.env.VERCEL = "1";
  resetLikesStore();
  try {
    const get = await (await fetch(`${base}/api/likes`)).json();
    assert.equal(get.enabled, false);
    const res = await like("bioluniel", "10.1.0.4");
    assert.equal(res.status, 503);
  } finally {
    delete process.env.VERCEL;
  }
});
