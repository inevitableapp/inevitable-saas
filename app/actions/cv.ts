"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function saveCVData(data: any) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw new Error("Unauthorized");

    const user = await prisma.user.findFirst({
        where: { email: session.user.email },
        include: { profile: true }
    });

    if (!user?.profile) throw new Error("Profile not found");

    // Update experiences, education, etc.
    // This is a complex update in Prisma. For MVP, we'll keep it simple.

    // Example for experiences:
    // await prisma.experience.deleteMany({ where: { profileId: user.profile.id } });
    // await prisma.experience.createMany({ 
    //   data: data.experiences.map((exp: any) => ({ ...exp, profileId: user.profile.id })) 
    // });

    revalidatePath("/dashboard");
    revalidatePath("/cv-builder");
    return { success: true };
}

export async function generateCVExport(format: "pdf" | "docx") {
    // Logic to trigger PDF generation and upload to S3
    return { success: true, url: "stub-url" };
}
