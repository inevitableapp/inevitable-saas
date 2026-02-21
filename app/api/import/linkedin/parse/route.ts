import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    // Logic for POST /api/import/linkedin/parse
    // Here we would call AI to parse the raw text/pdf
    return NextResponse.json({
        normalizedData: {
            experiences: [],
            education: [],
            skills: []
        }
    });
}
