"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, Calendar } from "lucide-react";

const COLUMNS = [
    { id: "SAVED", title: "Guardado" },
    { id: "APPLIED", title: "Postulado" },
    { id: "INTERVIEWING", title: "Entrevistas" },
    { id: "OFFERED", title: "Ofertas" },
    { id: "REJECTED", title: "Rechazado" },
];

export function JobTracker() {
    return (
        <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-200px)]">
            {COLUMNS.map((col) => (
                <div key={col.id} className="min-w-[300px] flex-1 flex flex-col bg-gray-100/50 rounded-xl">
                    <div className="p-4 flex justify-between items-center">
                        <h3 className="font-bold text-gray-700 flex items-center gap-2">
                            {col.title}
                            <span className="bg-gray-200 text-gray-500 text-xs px-2 py-0.5 rounded-full font-normal">0</span>
                        </h3>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="flex-1 p-2 space-y-3 overflow-y-auto">
                        {/* Cards would go here */}
                        {col.id === "SAVED" && (
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:border-indigo-300 transition-colors">
                                <div className="flex justify-between items-start mb-2 text-xs text-gray-500">
                                    <span className="font-bold text-indigo-600">Google</span>
                                    <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                                </div>
                                <h4 className="font-semibold text-sm mb-1">Senior Software Engineer</h4>
                                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                    <Calendar className="w-3 h-3" />
                                    Agregado: 20 Feb
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
