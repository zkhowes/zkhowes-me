import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { vanhallaDir } from "@/lib/vanhalla";

const contentTypes: Record<string, string> = {
  ".pdf": "application/pdf",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params;
  const safeFilename = path.basename(filename);
  const ext = path.extname(safeFilename).toLowerCase();

  if (!contentTypes[ext]) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = path.join(vanhallaDir, safeFilename);

  if (!filePath.startsWith(vanhallaDir)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const file = await fs.readFile(filePath);

    return new NextResponse(file, {
      headers: {
        "Cache-Control": "public, max-age=86400",
        "Content-Disposition": `inline; filename="${safeFilename.replaceAll('"', "")}"`,
        "Content-Type": contentTypes[ext],
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
