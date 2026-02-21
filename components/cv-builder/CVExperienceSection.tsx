import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function CVExperienceSection({ experiences, onChange }: { experiences: any[], onChange: (exps: any[]) => void }) {
    const addExperience = () => {
        onChange([...experiences, { company: "", role: "", startDate: "", endDate: "", description: "" }]);
    };

    const updateExperience = (idx: number, field: string, value: string) => {
        const newExps = [...experiences];
        newExps[idx] = { ...newExps[idx], [field]: value };
        onChange(newExps);
    };

    const removeExperience = (idx: number) => {
        onChange(experiences.filter((_, i) => i !== idx));
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Experiencia Profesional</CardTitle>
                <Button size="sm" variant="outline" onClick={addExperience} className="gap-1">
                    <Plus className="w-4 h-4" /> Agregar
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                {experiences.map((exp, idx) => (
                    <div key={idx} className="p-4 border rounded-lg space-y-4 relative group">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
                            onClick={() => removeExperience(idx)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Empresa</Label>
                                <Input value={exp.company} onChange={(e) => updateExperience(idx, "company", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Cargo</Label>
                                <Input value={exp.role} onChange={(e) => updateExperience(idx, "role", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Fecha Inicio</Label>
                                <Input type="month" value={exp.startDate} onChange={(e) => updateExperience(idx, "startDate", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Fecha Fin</Label>
                                <Input type="month" value={exp.endDate} onChange={(e) => updateExperience(idx, "endDate", e.target.value)} placeholder="Presente" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Descripción / Logros</Label>
                            <textarea
                                className="w-full min-h-[100px] p-2 border rounded-md text-sm"
                                value={exp.description}
                                onChange={(e) => updateExperience(idx, "description", e.target.value)}
                                placeholder="Describe tus responsabilidades y logros principales..."
                            />
                        </div>
                    </div>
                ))}
                {experiences.length === 0 && (
                    <p className="text-center text-sm text-gray-400 py-4">Aún no has agregado ninguna experiencia.</p>
                )}
            </CardContent>
        </Card>
    );
}
