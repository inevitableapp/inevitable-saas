"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function saveOnboardingData(data: {
    targetRole: string;
    country: string;
    language: string;
}) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        throw new Error("No estás autenticado");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    // Create or update profile
    const profile = await prisma.profile.upsert({
        where: { userId: user.id },
        update: {
            targetRole: data.targetRole,
            country: data.country,
            language: data.language,
        },
        create: {
            userId: user.id,
            targetRole: data.targetRole,
            country: data.country,
            language: data.language,
        },
    });

    // Mark onboarding as completed (optional: could have a field on User or Profile)

    revalidatePath("/dashboard");
    return { success: true, profileId: profile.id };
}

export async function deleteImportSession(id: string) {
    // Skeleton for deleting import session (LinkedIn source)
}
