import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { StripeService } from "@/lib/stripe";

export async function POST(req: Request) {
    const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

    try {
        await StripeService.handleWebhook(body, signature);
        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error("Webhook Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
