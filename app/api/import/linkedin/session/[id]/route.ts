import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ Next 16 espera params como Promise

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Logic for GET /api/import/linkedin/session/[id]
  // Puedes usar `id` aquí si lo necesitas
  return NextResponse.json({
    status: "completed",
    data: {},
  });
}