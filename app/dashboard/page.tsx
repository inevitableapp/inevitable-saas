import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { AIProvider } from "@/lib/ai-provider";
import { ATSScoreCard } from "@/components/dashboard/ATSScoreCard";
import { CriticalErrorsList } from "@/components/dashboard/CriticalErrorsList";
import { LostOpportunitiesCard } from "@/components/dashboard/LostOpportunitiesCard";
import { CVPreviewLocked } from "@/components/dashboard/CVPreviewLocked";
import { getUserPermissions } from "@/lib/permissions";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/auth/signin");

    const user = await prisma.user.findFirst({
        where: { email: session.user?.email },
        include: { profile: true }
    });

    if (!user?.profile) redirect("/onboarding");

    // Run or Fetch Diagnostic
    // For MVP, we run it on load if not present or stale
    const diagnostic = await AIProvider.runATSScan(
        user.profile,
        user.profile.targetRole || "Profesional",
        user.profile.country || "Chile"
    );

    const opportunities = await AIProvider.calculateLostOpportunities(
        user.profile,
        diagnostic,
        user.profile.country || "Chile"
    );

    const permissions = getUserPermissions(user);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <header className="bg-white border-b sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="font-black text-2xl tracking-tighter text-indigo-900">INEVITABLE</div>
                    <div className="flex items-center gap-4 text-sm font-medium">
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">Plan: {user.plan}</span>
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 capitalize">
                            {session.user?.name?.[0] || "U"}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Diagnostics */}
                    <div className="lg:col-span-4 space-y-8">
                        <ATSScoreCard
                            score={diagnostic.score}
                            readability={diagnostic.atsReadability}
                            impact={diagnostic.impactStrength}
                            clarity={diagnostic.clarity}
                        />
                        <LostOpportunitiesCard
                            matches={opportunities.jobMatchesEstimate}
                            salary={opportunities.salaryRangeEstimate}
                            probNow={opportunities.interviewProbNow}
                            probOptimized={opportunities.interviewProbOptimized}
                            narrative={opportunities.valueNarrative}
                        />
                    </div>

                    {/* Right Column: Detailed Errors & Preview */}
                    <div className="lg:col-span-8 space-y-8">
                        <CriticalErrorsList errors={diagnostic.criticalErrors} />

                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-gray-800">Vista Previa CV Optimizado</h2>
                            {permissions.showPreviewLocked ? (
                                <CVPreviewLocked />
                            ) : (
                                <div className="p-8 border rounded-xl bg-white">
                                    {/* Real CV Preview would go here for paid users */}
                                    <p>Editor de CV habilitado.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
