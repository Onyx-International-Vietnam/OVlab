import { Weight, Ruler, Thermometer } from "lucide-react";
export default function KeyMetric({ label, value, kind }: { label: string; value: string; kind: "weight" | "ruler" | "thermo" }) {
    const Icon = kind === "weight" ? Weight : kind === "ruler" ? Ruler : Thermometer;
    const bg = kind === "weight" ? "bg-blue-50 text-blue-700" : kind === "ruler" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700";
    return (
        <div className={`flex items-center justify-between rounded-lg border border-slate-200 ${bg} px-4 py-3`}>
            <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-white/70">
                    <Icon className="h-5 w-5" />
                </div>
                <div className="font-medium">{label}</div>
            </div>
            <div className="text-xl font-semibold">{value}</div>
        </div>
    );
}