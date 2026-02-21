import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, Users, DollarSign, CalendarCheck } from "lucide-react";

interface LostOpportunitiesProps {
    matches: { min: number; max: number };
    salary: { min: number | null; max: number | null; currency: string };
    probNow: number;
    probOptimized: number;
    narrative: string;
}

export function LostOpportunitiesCard({ matches, salary, probNow, probOptimized, narrative }: LostOpportunitiesProps) {
    const lift = ((probOptimized - probNow) / probNow * 100).toFixed(0);

    return (
        <Card className="bg-gradient-to-br from-indigo-900 to-indigo-800 text-white shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingDown className="w-24 h-24" />
            </div>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Oportunidades Perdidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-indigo-200 text-sm mb-1">
                            <Users className="w-4 h-4" />
                            Vacantes compatibles
                        </div>
                        <div className="text-2xl font-bold">{matches.min} - {matches.max}</div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-indigo-200 text-sm mb-1">
                            <DollarSign className="w-4 h-4" />
                            Salario potencial
                        </div>
                        <div className="text-2xl font-bold">
                            {salary.currency !== "unknown" ? `${salary.min?.toLocaleString()} CLP` : "Unknown"}
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <div className="text-sm font-medium text-indigo-200">Probabilidad de entrevista</div>
                        <div className="text-green-400 font-bold text-lg">+{lift}% de mejora</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-400" style={{ width: `${probNow * 100}%` }} />
                        </div>
                        <span className="text-xs w-8">Actual</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]" style={{ width: `${probOptimized * 100}%` }} />
                        </div>
                        <span className="text-xs w-8">Optimizado</span>
                    </div>
                </div>

                <p className="text-sm italic text-indigo-100 border-l-2 border-indigo-400 pl-4 py-1">
                    &ldquo;{narrative}&rdquo;
                </p>
            </CardContent>
        </Card>
    );
}
