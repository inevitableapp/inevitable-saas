import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { PLANS } from "@/lib/plans";
import { createCheckout } from "@/app/actions/stripe";

export function Paywall() {
    const recommendedPlan = PLANS.find(p => p.id === "plan_b_aceleracion");

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100">
            <div className="text-center mb-6">
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Plan Recomendado
                </span>
                <h2 className="text-2xl font-bold mt-2">{recommendedPlan?.name}</h2>
                <div className="text-3xl font-extrabold mt-1">
                    ${recommendedPlan?.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ mes</span>
                </div>
            </div>

            <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>CVs y Cartas ilimitadas</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>Optimización por oferta laboral</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>Tracker de postulaciones ilimitado</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>Descargas PDF y DOCX ilimitadas</span>
                </li>
            </ul>

            <form action={async () => {
                await createCheckout(recommendedPlan?.stripePriceId || "");
            }}>
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 text-lg shadow-lg shadow-indigo-200">
                    Actualizar Ahora
                </Button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-4 underline cursor-pointer">
                Ver todos los planes
            </p>
        </div>
    );
}
