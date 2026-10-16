// Runs after `react-scripts build`:
// - fills __SITE_URL__ in index.html (canonical, Open Graph, JSON-LD)
// - writes sitemap.xml and robots.txt
// - adds Vercel Web Analytics when building on Vercel
//
// SITE_URL: set it in Vercel to your final domain (e.g. https://robertopalestini.dev).
// Without it, Vercel's production domain is used.
const fs = require("fs");
const path = require("path");

const build = path.join(__dirname, "..", "build");
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "";
const siteUrl = (process.env.SITE_URL || fromVercel || "").replace(/\/$/, "");

const projectIds = require("../Server/data/likeable.json").filter((id) => id !== "portfolio");
const routes = ["/", "/about", "/project", "/resume", ...projectIds.map((id) => `/project/${id}`)];

const indexPath = path.join(build, "index.html");
let html = fs.readFileSync(indexPath, "utf8").split("__SITE_URL__").join(siteUrl);

if (process.env.VERCEL) {
  html = html.replace(
    "</head>",
    '<script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)}</script>' +
      '<script defer src="/_vercel/insights/script.js"></script></head>'
  );
}
fs.writeFileSync(indexPath, html);

const robots = ["User-agent: *", "Allow: /"];
if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((r) => `  <url><loc>${siteUrl}${r === "/" ? "/" : r}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n");
  fs.writeFileSync(
    path.join(build, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
  robots.push(`Sitemap: ${siteUrl}/sitemap.xml`);
}
fs.writeFileSync(path.join(build, "robots.txt"), `${robots.join("\n")}\n`);

console.log(`postbuild: site URL "${siteUrl || "(relative)"}", ${routes.length} routes`);
