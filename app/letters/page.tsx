import { CoverLetterGenerator } from "@/components/letters/CoverLetterGenerator";

export default function LettersPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <header className="bg-white border-b sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="font-bold text-xl text-indigo-900">Cartas de Presentación IA</h1>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 pt-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Generador de Cartas</h2>
                    <p className="text-gray-600">Crea cartas personalizadas y optimizadas en segundos.</p>
                </div>
                <CoverLetterGenerator />
            </main>
        </div>
    );
}
