// Liveness endpoint for uptime monitoring (e.g. UptimeRobot).
// Always fresh, never cached, and not locale-prefixed (see middleware matcher).
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok" }, { status: 200, headers: { "Cache-Control": "no-store" } });
}
