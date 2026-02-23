import { NextResponse } from "next/server";
import { saveOnboardingData } from "@/app/actions/onboarding";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    await saveOnboardingData(data);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API onboarding error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}