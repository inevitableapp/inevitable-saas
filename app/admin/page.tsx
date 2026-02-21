import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findFirst({
        where: { email: session?.user?.email },
    });

    if (user?.role !== "ADMIN") {
        redirect("/dashboard");
    }

    const userCount = await prisma.user.count();
    const subscriptionCount = await prisma.subscription.count();
    const recentEvents = await prisma.analyticsEvent.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: { user: true }
    });

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl shadow border">
                    <div className="text-gray-500 text-sm">Total Usuarios</div>
                    <div className="text-3xl font-bold">{userCount}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow border">
                    <div className="text-gray-500 text-sm">Suscripciones Activas</div>
                    <div className="text-3xl font-bold">{subscriptionCount}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow border">
                    <div className="text-gray-500 text-sm">MRR Estimado</div>
                    <div className="text-3xl font-bold font-mono text-green-600">$0</div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow border overflow-hidden">
                <div className="p-4 border-b font-bold">Actividad Reciente</div>
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4">Usuario</th>
                            <th className="p-4">Evento</th>
                            <th className="p-4">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentEvents.map(event => (
                            <tr key={event.id} className="border-t">
                                <td className="p-4">{event.user.email}</td>
                                <td className="p-4"><code className="bg-gray-100 px-1 rounded">{event.event}</code></td>
                                <td className="p-4">{event.createdAt.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
