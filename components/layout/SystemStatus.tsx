"use client";
import { cn } from "@/lib/utils";
export default function SystemStatus({ online = true }: { online?: boolean }) {
    return (
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm">
            <span className={cn("h-2.5 w-2.5 rounded-full", online ? "bg-green-500" : "bg-amber-500")}></span>
            <span className="text-slate-600">System {online ? "Online" : "Degraded"}</span>
        </div>
    );
}