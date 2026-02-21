import prisma from "@/lib/prisma";

export interface ATSDiagnostic {
    score: number;
    atsReadability: number;
    impactStrength: number;
    clarity: number;
    criticalErrors: Array<{ code: string; title: string; detail: string; fix: string }>;
    warnings: Array<{ code: string; title: string; detail: string; fix: string }>;
    missingKeywords: Array<{ keyword: string; reason: string }>;
    suggestions: Array<{ title: string; why: string; how: string }>;
}

export interface LostOpportunities {
    jobMatchesEstimate: { min: number; max: number };
    salaryRangeEstimate: { min: number | null; max: number | null; currency: string };
    interviewProbNow: number;
    interviewProbOptimized: number;
    rolesReachable: Array<{ role: string; why: string }>;
    topLossDrivers: Array<{ title: string; detail: string }>;
    valueNarrative: string;
}

export class AIProvider {
    static async getPrompt(key: string) {
        const prompt = await prisma.adminPrompt.findUnique({
            where: { key, active: true },
        });
        return prompt?.content || "";
    }

    static async runATSScan(profileData: any, targetRole: string, country: string): Promise<ATSDiagnostic> {
        const promptTemplate = await this.getPrompt("ATS_SCAN_V1");
        // In a real implementation, we would replace variables and call LLM
        // For now, returning a realistic stub
        return {
            score: 45,
            atsReadability: 60,
            impactStrength: 30,
            clarity: 50,
            criticalErrors: [
                { code: "NO_EXPERIENCE", title: "Falta de experiencia relevante", detail: "No se detectaron roles previos en el área objetivo.", fix: "Agrega proyectos o voluntariado." }
            ],
            warnings: [],
            missingKeywords: [],
            suggestions: []
        };
    }

    static async calculateLostOpportunities(profileData: any, diagnostic: ATSDiagnostic, country: string): Promise<LostOpportunities> {
        const promptTemplate = await this.getPrompt("LOST_OPPORTUNITIES_V1");
        return {
            jobMatchesEstimate: { min: 5, max: 15 },
            salaryRangeEstimate: { min: 800000, max: 1200000, currency: "CLP" },
            interviewProbNow: 0.1,
            interviewProbOptimized: 0.45,
            rolesReachable: [],
            topLossDrivers: [],
            valueNarrative: "Tu perfil actual tiene baja visibilidad en el mercado chileno."
        };
    }

    static async generatePreviewLocked(profileData: any, targetRole: string) {
        // Generate blurred/locked content
        return { locked: true, content: {} };
    }
}
