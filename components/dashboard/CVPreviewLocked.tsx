import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Paywall } from "@/components/dashboard/Paywall";

export function CVPreviewLocked() {
    return (
        <div className="relative border rounded-xl overflow-hidden bg-white shadow-inner">
            {/* Blurred Content Placeholder */}
            <div className="p-8 space-y-6 filter blur-md opacity-30 select-none pointer-events-none">
                <div className="h-8 w-48 bg-gray-300 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="space-y-2">
                    <div className="h-3 w-full bg-gray-100 rounded" />
                    <div className="h-3 w-11/12 bg-gray-100 rounded" />
                    <div className="h-3 w-4/5 bg-gray-100 rounded" />
                </div>
                <div className="h-6 w-32 bg-gray-300 rounded" />
                <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-gray-100 rounded" />
                    <div className="h-20 bg-gray-100 rounded" />
                </div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/10 backdrop-blur-[2px] p-6 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 text-indigo-600">
                    <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Tu CV Optimizado está listo</h3>
                <p className="text-gray-600 mt-2 max-w-sm">
                    Hemos generado una versión mejorada de tu perfil usando criterios ATS.
                    Suscríbete para desbloquear el editor, las descargas y el Job Tracker.
                </p>
                <div className="mt-8 w-full max-w-sm">
                    <Paywall />
                </div>
            </div>
        </div>
    );
}
