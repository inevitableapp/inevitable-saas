import { PLANS } from "@/lib/plans";
import { User, Plan } from "@prisma/client";

// Define the permissions structure
export interface UserPermissions {
    canGenerateCV: boolean;
    canExport: boolean;
    canGenerateCoverLetter: boolean;
    canUseTracker: boolean;
    showPreviewLocked: boolean;
    maxActiveCVs: number;
    maxExports: number;
    maxCoverLetters: number;
    maxTrackerItems: number;
    unlimited: boolean;
}

const DEFAULT_PERMISSIONS: UserPermissions = {
    canGenerateCV: false,
    canExport: false,
    canGenerateCoverLetter: false,
    canUseTracker: false,
    showPreviewLocked: true,
    maxActiveCVs: 0,
    maxExports: 0,
    maxCoverLetters: 0,
    maxTrackerItems: 0,
    unlimited: false,
};

export function getUserPermissions(user?: { plan: Plan } | null): UserPermissions {
    if (!user) return DEFAULT_PERMISSIONS;

    switch (user.plan) {
        case "FREE":
            return DEFAULT_PERMISSIONS;

        case "PLAN_A":
            return {
                canGenerateCV: true,
                canExport: true,
                canGenerateCoverLetter: true,
                canUseTracker: true,
                showPreviewLocked: false,
                maxActiveCVs: 1,
                maxExports: 5,
                maxCoverLetters: 1,
                maxTrackerItems: 10,
                unlimited: false,
            };

        case "PLAN_B":
        case "PLAN_C":
            return {
                canGenerateCV: true,
                canExport: true,
                canGenerateCoverLetter: true,
                canUseTracker: true,
                showPreviewLocked: false,
                maxActiveCVs: Infinity,
                maxExports: Infinity,
                maxCoverLetters: Infinity,
                maxTrackerItems: Infinity,
                unlimited: true,
            };

        default:
            return DEFAULT_PERMISSIONS;
    }
}

export function canPerformAction(
    user: { plan: Plan } | null | undefined,
    action: keyof UserPermissions,
    currentCount: number = 0
): boolean {
    if (!user) return false;
    const permissions = getUserPermissions(user);

    // Check boolean permission
    if (typeof permissions[action] === "boolean") {
        // @ts-ignore
        return permissions[action];
    }

    // Check numeric limit (e.g. maxExports)
    // This logic depends on mapping action to limit, which is not strictly 1:1 in the interface
    // For now, we assume direct boolean checks are handled above.
    // Implementing limit checks would require knowing which limit corresponds to which action.

    return false;
}

// Helper specific limit checks
export function checkLimit(
    user: { plan: Plan } | null | undefined,
    limitType: "cv" | "export" | "coverLetter" | "tracker",
    currentCount: number
): boolean {
    const perms = getUserPermissions(user);

    if (perms.unlimited) return true;

    switch (limitType) {
        case "cv":
            return currentCount < perms.maxActiveCVs;
        case "export":
            return currentCount < perms.maxExports;
        case "coverLetter":
            return currentCount < perms.maxCoverLetters;
        case "tracker":
            return currentCount < perms.maxTrackerItems;
        default:
            return false;
    }
}
