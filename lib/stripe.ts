import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
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

        if (!userId || !subscriptionId) {
          // Si no hay userId o subscriptionId, no hacemos nada
          return;
        }

        // Recuperar subscription desde Stripe
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        // Obtener priceId (primer item)
        const firstItem = subscription.items?.data?.[0];
        const priceId = firstItem?.price?.id;

        if (!priceId) {
          throw new Error("Stripe subscription missing priceId");
        }

        // Determinar plan interno por priceId
        const plan = this.getPlanFromPriceId(priceId);

        // current period start/end pueden venir en snake_case o camelCase dependiendo de SDK/tipos
        const subAny = subscription as any;
        const cps = subAny.current_period_start ?? subAny.currentPeriodStart;
        const cpe = subAny.current_period_end ?? subAny.currentPeriodEnd;

        if (cps == null || cpe == null) {
          throw new Error("Stripe subscription missing current period fields");
        }

        // Actualizar el usuario con el plan
        await prisma.user.update({
          where: { id: userId },
          data: { plan: plan || "FREE" },
        });

        // Crear registro de suscripción en DB
        await prisma.subscription.create({
          data: {
            userId,
            stripeId: subscriptionId,
            plan: plan || "FREE",
            status: subscription.status,
            currentPeriodStart: new Date(cps * 1000),
            currentPeriodEnd: new Date(cpe * 1000),
          },
        });

        break;
      }

      // Puedes agregar otros eventos si lo necesitas:
      // case "customer.subscription.deleted": { ... break; }

      default:
        // No hacemos nada para otros eventos
        break;
    }
  }

  private static getPlanFromPriceId(priceId: string) {
    if (priceId === process.env.STRIPE_PRICE_PLAN_A) return "PLAN_A";
    if (priceId === process.env.STRIPE_PRICE_PLAN_B) return "PLAN_B";
    if (priceId === process.env.STRIPE_PRICE_PLAN_C) return "PLAN_C";
    return null;
  }
}