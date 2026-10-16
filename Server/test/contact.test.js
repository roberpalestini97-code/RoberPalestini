// Run with: npm test  (uses Node's built-in test runner)
process.env.MAIL_TRANSPORT = "json";

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
  assert.equal(owner.to[0].address, "roberpalestini97@gmail.com");
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
  assert.equal(sent[0].to[0].address, "roberpalestini97@gmail.com");
  assert.ok(!sent[0].replyTo);
});

test("confirmation email follows the visitor language", async () => {
  sent.length = 0;
  const res = await post(
    { name: "Lucía Díaz", phone: "2233431845", email: "lucia@example.com", lang: "es" },
    "10.0.0.6"
  );
  assert.equal(res.status, 200);
  assert.match(sent[1].subject, /Gracias por escribir/);
  assert.match(sent[1].text, /¡Hola Lucía!/);
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

test("config cleans pasted values: quotes, spaces in the app password", () => {
  const saved = { ...process.env };
  process.env.SMTP_USER = "  me@gmail.com ";
  process.env.SMTP_PASS = "abcd efgh ijkl mnop";
  process.env.MAIL_FROM = '"Portfolio <me@gmail.com>"';
  delete process.env.SMTP_HOST;
  try {
    const mail = require("../config").getMail();
    assert.equal(mail.user, "me@gmail.com");
    assert.equal(mail.pass, "abcdefghijklmnop");
    assert.equal(mail.from, "Portfolio <me@gmail.com>");
    assert.equal(mail.host, "smtp.gmail.com");
    assert.equal(mail.to, "roberpalestini97@gmail.com");
  } finally {
    process.env = saved;
  }
});

test("health reports missing mail settings without leaking values", async () => {
  const saved = { ...process.env };
  delete process.env.SMTP_PASS;
  process.env.SMTP_USER = "me@gmail.com";
  try {
    const body = await (await fetch(`${base}/api/health`)).json();
    assert.equal(body.status, "ok");
    assert.equal(body.mail.configured, false);
    assert.deepEqual(body.mail.missing, ["SMTP_PASS"]);
    assert.ok(!JSON.stringify(body).includes("me@gmail.com"));
  } finally {
    process.env = saved;
  }
});
