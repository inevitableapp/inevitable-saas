export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">INEVITABLE</h1>
      <p className="text-xl mb-8">Diagnóstico de CV y Optimización con IA</p>
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Diagnosticar mi CV gratis
        </button>
      </div>
    </div>
  );
}
