import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16", // or latest
} as any);

export class StripeService {
    static async createCheckoutSession(userId: string, priceId: string, email: string) {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer_email: email,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `${process.env.NEXTAUTH_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/dashboard`,
            metadata: {
                userId,
            },
        });

        return session;
    }

    static async handleWebhook(body: string, sig: string) {
        const event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );

        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                const userId = session.metadata?.userId;
                const subscriptionId = session.subscription as string;

                if (userId && subscriptionId) {
                    const subscription: Stripe.Subscription = await stripe.subscriptions.retrieve(subscriptionId) as Stripe.Subscription;
                    const priceId = subscription.items.data[0].price.id;

                    // Find the plan enum by priceId
                    const plan = this.getPlanFromPriceId(priceId);

                    await prisma.user.update({
                        where: { id: userId },
                        data: { plan: plan || "FREE" },
                    });

                    await prisma.subscription.create({
                        data: {
                            userId,
                            stripeId: subscriptionId,
                            plan: plan || "FREE",
                            status: subscription.status,
                            currentPeriodStart: new Date(subscription.current_period_start * 1000),
                            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                        },
                    });
                }
                break;
            }
            // Handle other events like customer.subscription.deleted
        }
    }

    private static getPlanFromPriceId(priceId: string) {
        if (priceId === process.env.STRIPE_PRICE_PLAN_A) return "PLAN_A";
        if (priceId === process.env.STRIPE_PRICE_PLAN_B) return "PLAN_B";
        if (priceId === process.env.STRIPE_PRICE_PLAN_C) return "PLAN_C";
        return null;
    }
}
