// Same-origin "/api" by default (Vercel functions in production, CRA proxy
// to Server/ in development). Override with REACT_APP_API_URL if needed.
export const API_URL = (process.env.REACT_APP_API_URL || "/api").replace(/\/$/, "");
