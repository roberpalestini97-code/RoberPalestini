const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const likeRoute = require("./Routes/likeMethods");
const rankRoute = require("./Routes/rankMethods");
const contactRoute = require("./Routes/contact");

const app = express();

// Vercel (and most hosts) sit behind a proxy; needed for per-IP rate limiting.
app.set("trust proxy", 1);

const allowedOrigins = config.getAllowedOrigins();
app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.get("/", (req, res) => res.json({ message: "Server Running" }));

app.use("/likes", likeRoute);
app.use("/ranks", rankRoute);
app.use("/contact", contactRoute);

const uri = config.getSecretToken();
if (!uri) {
  console.warn("MONGODB_URI not set: API running without database connection");
} else {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongoose Connection Successful"))
    .catch((err) => console.log(err));
}

module.exports = app;
