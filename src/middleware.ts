import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run on every path except API routes, the health check, Next internals, and
  // files with an extension. /health must bypass locale routing so it stays a
  // plain, unprefixed 200 for uptime monitors.
  matcher: ["/((?!api|health|_next|_vercel|.*\\..*).*)"],
};
