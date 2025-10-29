"use client";
import * as React from "react";
export default function VideoPlayer({ poster }: { poster?: string }) {
    return (
        <div className="card overflow-hidden">
            <video controls poster={poster} className="h-auto w-full">
                <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="flex items-center justify-between bg-slate-900 px-4 py-2 text-white">
                <div className="flex items-center gap-3 text-sm">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10">⏸</span>
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10">🔊</span>
                    <div className="h-1 w-48 rounded bg-white/20"><div className="h-1 w-1/3 rounded bg-white/80"></div></div>
                </div>
                <div className="text-sm opacity-90">28:09</div>
            </div>
        </div>
    );
}