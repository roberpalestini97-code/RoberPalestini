// Runtime configuration read from environment variables.
// Copy .env.example to .env (or set the vars in Vercel) before starting.
require("dotenv").config();

module.exports = {
  getSecretToken: () => process.env.MONGODB_URI,
  getUser: () => process.env.SECRET_USER || "Roberto Palestini",
};
