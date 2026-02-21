import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface CriticalError {
    code: string;
    title: string;
    detail: string;
    fix: string;
}

interface CriticalErrorsListProps {
    errors: CriticalError[];
}

export function CriticalErrorsList({ errors }: CriticalErrorsListProps) {
    return (
        <Card className="shadow-lg border-red-100">
            <CardHeader>
                <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-6 h-6" />
                    <CardTitle>Errores Críticos</CardTitle>
                </div>
                <CardDescription>
                    Estos problemas impiden que tu CV pase los filtros ATS.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {errors.map((error, idx) => (
                    <div key={idx} className="p-4 bg-red-50 rounded-lg border border-red-100">
                        <h4 className="font-bold text-red-900">{error.title}</h4>
                        <p className="text-sm text-red-800 mt-1">{error.detail}</p>
                        <div className="mt-3 flex gap-2 items-start text-xs text-green-700 bg-white p-2 rounded shadow-sm border border-green-100">
                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                            <div>
                                <span className="font-bold">Cómo arreglarlo:</span> {error.fix}
                            </div>
                        </div>
                    </div>
                ))}
                {errors.length === 0 && (
                    <div className="text-center py-6 text-gray-500 italic">
                        No se detectaron errores críticos. ¡Buen trabajo!
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
