import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CVHeaderSection({ data, onChange }: { data: any, onChange: (d: any) => void }) {
    return (
        <Card>
            <CardHeader><CardTitle>Información de Contacto</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Nombre Completo</Label>
                    <Input value={data.name || ""} onChange={(e) => onChange({ ...data, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={data.email || ""} onChange={(e) => onChange({ ...data, email: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label>Teléfono</Label>
                    <Input value={data.phone || ""} onChange={(e) => onChange({ ...data, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label>Ubicación</Label>
                    <Input value={data.location || ""} onChange={(e) => onChange({ ...data, location: e.target.value })} placeholder="Ej: Santiago, Chile" />
                </div>
            </CardContent>
        </Card>
    );
}
