// Run with: npm test  (uses Node's built-in test runner)
process.env.MAIL_TRANSPORT = "json";
process.env.MONGODB_URI = "";

const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const nodemailer = require("nodemailer");

const sent = [];
const realCreate = nodemailer.createTransport;
nodemailer.createTransport = (opts) => {
  const t = realCreate(opts);
  const send = t.sendMail.bind(t);
  t.sendMail = async (msg) => {
    const info = await send(msg);
    sent.push(JSON.parse(info.message));
    return info;
  };
  return t;
};

const app = require("../app");
let server;
let base;

before(async () => {
  server = app.listen(0);
  await new Promise((r) => server.once("listening", r));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

const post = (body, ip) =>
  fetch(`${base}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
    body: JSON.stringify(body),
  });

test("sends owner email and visitor confirmation", async () => {
  sent.length = 0;
  const res = await post(
    { name: "Ana <b>Pérez</b>", phone: "+54 9 223 343-1845", email: "ana@example.com" },
    "10.0.0.1"
  );
  assert.equal(res.status, 200);
  assert.equal(sent.length, 2);
  const [owner, copy] = sent;
  assert.equal(owner.to[0].address, "owner@example.com");
  assert.equal(owner.replyTo[0].address, "ana@example.com");
  assert.match(owner.html, /Ana &lt;b&gt;Pérez&lt;\/b&gt;/);
  assert.match(owner.html, /wa\.me\/5492233431845/);
  assert.equal(copy.to[0].address, "ana@example.com");
});

test("email is optional: only the owner is notified", async () => {
  sent.length = 0;
  const res = await post({ name: "Juan", phone: "2233431845" }, "10.0.0.2");
  assert.equal(res.status, 200);
  assert.equal(sent.length, 1);
  assert.ok(!sent[0].replyTo);
});

test("rejects invalid name, phone and email", async () => {
  const res = await post({ name: "J", phone: "abc", email: "nope" }, "10.0.0.3");
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.deepEqual(Object.keys(body.errors).sort(), ["email", "name", "phone"]);
});

test("honeypot submissions are dropped silently", async () => {
  sent.length = 0;
  const res = await post(
    { name: "Bot", phone: "12345678", company: "spam inc" },
    "10.0.0.4"
  );
  assert.equal(res.status, 200);
  assert.equal(sent.length, 0);
});

test("rate limits repeated submissions from the same IP", async () => {
  let last;
  for (let i = 0; i < 6; i += 1) {
    last = await post({ name: "Rate", phone: "12345678" }, "10.0.0.5");
  }
  assert.equal(last.status, 429);
});
