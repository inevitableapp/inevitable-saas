"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { StripeService } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createCheckout(priceId: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) throw new Error("User not found");

    const checkoutSession = await StripeService.createCheckoutSession(
        user.id,
        priceId,
        user.email as string
    );

    if (checkoutSession.url) {
        redirect(checkoutSession.url);
    }
}
