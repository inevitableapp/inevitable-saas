import { JobTracker } from "@/components/tracker/JobTracker";

export default function TrackerPage() {
    return (
        <div className="min-h-screen bg-white">
            <header className="bg-white border-b sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="font-bold text-xl">Job Tracker</h1>
                    <Button className="bg-indigo-600 text-white hover:bg-indigo-700">Nueva Postulación</Button>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 pt-8">
                <JobTracker />
            </main>
        </div>
    );
}

import { Button } from "@/components/ui/button";
