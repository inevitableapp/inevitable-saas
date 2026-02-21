import prisma from "@/lib/prisma";

export type AnalyticsEvent =
    | "signup_method"
    | "onboarding_completed"
    | "diagnostic_completed"
    | "paywall_viewed"
    | "upgrade_clicked"
    | "subscription_started"
    | "cv_preview_viewed"
    | "cv_generated"
    | "export_downloaded"
    | "tracker_item_created";

export class AnalyticsService {
    static async logEvent(userId: string, event: AnalyticsEvent, metadata: any = {}) {
        await prisma.analyticsEvent.create({
            data: {
                userId,
                event,
                metadata,
            },
        });
    }
}
