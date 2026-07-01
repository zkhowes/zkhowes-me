import { NextResponse } from "next/server";
import { computeStandings } from "@/app/(fifa)/fifa/_data/standings";

// Recomputed hourly via fetch revalidate; this route is a JSON view of the same.
export const revalidate = 3600;

export async function GET() {
  const result = await computeStandings(new Date().toISOString());
  return NextResponse.json(result);
}
