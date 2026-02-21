import { PLANS } from "@/lib/plans";
import Link from "next/link";

export default function Paywall({
    title = "Desbloquea esta función",
    description = "Necesitas un plan activo para acceder a esta característica.",
}: {
    title?: string;
    description?: string;
}) {
    const recommendedPlan = PLANS.find((p) => p.recommended);

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-lg text-center space-y-6">
            <div className="p-3 bg-yellow-100 rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-yellow-600"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                </svg>
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="text-gray-500 mt-2">{description}</p>
            </div>

            <div className="w-full max-w-sm">
                <div className="border border-blue-200 bg-white rounded-lg shadow-sm p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                        RECOMENDADO
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">
                        {recommendedPlan?.name}
                    </h4>
                    <div className="mt-2 flex items-baseline justify-center gap-x-2">
                        <span className="text-3xl font-bold tracking-tight text-gray-900">
                            ${recommendedPlan?.price.toLocaleString("es-CL")}
                        </span>
                        <span className="text-sm font-semibold leading-6 text-gray-600">
                            /mes
                        </span>
                    </div>
                    <ul className="mt-6 space-y-3 text-sm leading-6 text-gray-600 text-left">
                        {recommendedPlan?.features.slice(0, 4).map((feature) => (
                            <li key={feature} className="flex gap-x-3">
                                <svg
                                    className="h-6 w-5 flex-none text-blue-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="/pricing"
                        className="mt-6 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Obtener acceso completo
                    </Link>
                </div>
            </div>
        </div>
    );
}
