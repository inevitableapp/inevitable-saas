"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";

import { saveOnboardingData } from "@/app/actions/onboarding";

export default function OnboardingWizard() {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        targetRole: "",
        country: "",
        language: "es-419",
        experienceLevel: "entry", // entry, experienced
    });

    const handleNext = async () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            setIsSubmitting(true);
            try {
                await saveOnboardingData(formData);
                console.log("Submitting", formData);
                router.push("/dashboard");
            } catch (error) {
                console.error("Error saving onboarding data", error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <Card>
                <CardHeader>
                    <CardTitle>Configura tu Perfil - Paso {step} de 3</CardTitle>
                    <CardDescription>
                        {step === 1 && "Información Básica"}
                        {step === 2 && "Experiencia y Objetivo"}
                        {step === 3 && "Preferencias"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === 1 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">País</label>
                                <input
                                    className="w-full border rounded p-2"
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    placeholder="Ej: Chile"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Idioma de preferencia</label>
                                <select
                                    className="w-full border rounded p-2"
                                    value={formData.language}
                                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                >
                                    <option value="es-419">Español LATAM</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Rol Objetivo</label>
                                <input
                                    className="w-full border rounded p-2"
                                    value={formData.targetRole}
                                    onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                                    placeholder="Ej: Desarrollador Full Stack"
                                />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <p>Todo listo para comenzar el diagnóstico.</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleBack} disabled={step === 1 || isSubmitting}>
                        Atrás
                    </Button>
                    <Button onClick={handleNext} disabled={isSubmitting}>
                        {isSubmitting ? "Cargando..." : (step === 3 ? "Finalizar" : "Siguiente")}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
