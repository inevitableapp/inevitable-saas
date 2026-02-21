import OnboardingWizard from "@/components/onboarding/OnboardingWizard";

export default function OnboardingPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900">
                    Bienvenido a INEVITABLE
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                    Vamos a optimizar tu perfil para conseguir ese empleo.
                </p>
            </div>
            <OnboardingWizard />
        </main>
    );
}
