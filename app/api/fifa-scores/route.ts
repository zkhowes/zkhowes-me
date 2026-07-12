import { NextResponse } from "next/server";
import { computeStandings } from "@/app/(fifa)/fifa/_data/standings";

// Re-render at most once a minute (matches the /fifa page). Upstream
// football-data is still fetched with its own hourly revalidate.
export const revalidate = 60;

export async function GET() {
  const result = await computeStandings(new Date().toISOString());
  return NextResponse.json(result, {
    headers: {
      // Fresh at the browser, cached briefly at the CDN edge to spread load.
      "Cache-Control": "no-store, must-revalidate",
      "CDN-Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
