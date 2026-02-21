import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ATSScoreCardProps {
    score: number;
    readability: number;
    impact: number;
    clarity: number;
}

export function ATSScoreCard({ score, readability, impact, clarity }: ATSScoreCardProps) {
    return (
        <Card className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl">
            <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                    />
                    <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 58}
                        strokeDashoffset={2 * Math.PI * 58 * (1 - score / 100)}
                        strokeLinecap="round"
                        className="text-indigo-600 transition-all duration-1000 ease-out"
                    />
                </svg>
                <span className="absolute text-4xl font-bold text-gray-800">{score}</span>
            </div>
            <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl font-bold">Puntuación ATS</CardTitle>
            </CardHeader>
            <CardContent className="w-full grid grid-cols-1 gap-4 mt-4">
                <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                        <span>Legibilidad</span>
                        <span>{readability}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${readability}%` }} />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                        <span>Impacto</span>
                        <span>{impact}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${impact}%` }} />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                        <span>Claridad</span>
                        <span>{clarity}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: `${clarity}%` }} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
