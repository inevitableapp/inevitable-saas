"use client";

import { useState } from "react";
import { CVHeaderSection } from "@/components/cv-builder/CVHeaderSection";
import { CVExperienceSection } from "@/components/cv-builder/CVExperienceSection";
import { Button } from "@/components/ui/button";
import { Save, Download, Eye } from "lucide-react";
type CVHeader = Record<string, any>;

type CVExperience = {
  company?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
};

type CVEducation = {
  institution?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
};

type CVSkill = {
  name?: string;
  level?: string;
};

type CVData = {
  header: CVHeader;
  experiences: CVExperience[];
  education: CVEducation[];
  skills: CVSkill[];
};

export default function CVBuilderPage() {
const [cvData, setCvData] = useState<CVData>({
  header: {},
  experiences: [],
  education: [],
  skills: [],
});

    const handleSave = async () => {
        // Call server action to save
        console.log("Saving CV...", cvData);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <header className="bg-white border-b sticky top-0 z-30">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="font-bold text-lg">CV Builder</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="w-4 h-4" /> Preview
                        </Button>
                        <Button size="sm" className="gap-2" onClick={handleSave}>
                            <Save className="w-4 h-4" /> Guardar
                        </Button>
                        <Button size="sm" variant="secondary" className="gap-2 bg-indigo-600 text-white hover:bg-indigo-700">
                            <Download className="w-4 h-4" /> Exportar
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 pt-8 space-y-8">
                <CVHeaderSection
                    data={cvData.header}
                    onChange={(header) => setCvData({ ...cvData, header })}
                />
                <CVExperienceSection
                    experiences={cvData.experiences}
                    onChange={(experiences) => setCvData({ ...cvData, experiences })}
                />

                {/* Education, Skills sections would follow same pattern */}
            </main>
        </div>
    );
}
