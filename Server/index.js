const app = require("./app");

const Port = process.env.PORT || 3600;

// Locally `node index.js` starts a server; on Vercel the exported app is
// used as the serverless handler.
if (require.main === module) {
  app.listen(Port, () => {
    console.log(`Server Running ${Port}`);
  });
}

module.exports = app;
