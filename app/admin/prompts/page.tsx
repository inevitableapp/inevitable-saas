import prisma from "@/lib/prisma";

export default async function AdminPromptsPage() {
    const prompts = await prisma.adminPrompt.findMany();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Gestionar Prompts IA</h1>
            <div className="space-y-4">
                {prompts.map(prompt => (
                    <div key={prompt.id} className="p-4 bg-white border rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-mono font-bold">{prompt.key}</span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">v{prompt.version}</span>
                        </div>
                        <pre className="text-xs bg-gray-50 p-2 rounded max-h-32 overflow-y-auto whitespace-pre-wrap">
                            {prompt.content}
                        </pre>
                    </div>
                ))}
                {prompts.length === 0 && (
                    <p className="text-gray-500">No hay prompts configurados. Usa la semilla (seed) para inicializar.</p>
                )}
            </div>
        </div>
    );
}
