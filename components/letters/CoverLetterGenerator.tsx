"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wand2, Copy, Download } from "lucide-react";

export function CoverLetterGenerator() {
    const [jobDescription, setJobDescription] = useState("");
    const [letter, setLetter] = useState("");

    const generateLetter = async () => {
        // Call AI Action
        setLetter("Estimado equipo de reclutamiento,\n\nMe pongo en contacto con ustedes para expresar mi interés en la posición...");
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Generar Carta</CardTitle>
                    <CardDescription>Pega la descripción del empleo para optimizar tu carta.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Cargo / Empresa</Label>
                        <Input placeholder="Ej: Full Stack Developer en Google" />
                    </div>
                    <div className="space-y-2">
                        <Label>Descripción del Empleo</Label>
                        <textarea
                            className="w-full min-h-[200px] p-4 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Copia y pega la oferta laboral aquí..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                    </div>
                    <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 font-bold" onClick={generateLetter}>
                        <Wand2 className="w-4 h-4" /> Generar con IA
                    </Button>
                </CardContent>
            </Card>

            <Card className="flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                    <div>
                        <CardTitle>Resultado</CardTitle>
                        <CardDescription>Carta generada y optimizada para ATS.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Copy className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="w-4 h-4" /></Button>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 p-6">
                    {letter ? (
                        <div className="whitespace-pre-wrap text-sm text-gray-700 font-serif leading-relaxed">
                            {letter}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 italic space-y-2 pt-20">
                            <p>Tu carta aparecerá aquí después de generarla.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
