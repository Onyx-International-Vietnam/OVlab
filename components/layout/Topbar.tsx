// components/layout/Topbar.tsx
"use client";

import Link from "next/link";
import { Bell, User } from "lucide-react";
import SystemStatus from "@/components/layout/SystemStatus";
import { Button } from "@/components/ui/button";

export default function Topbar() {
    return (
        <header className="sticky top-0 z-50 w-full bg-[#2E353F] text-white px-3">
            <div className="flex h-12 items-center justify-between">
                {/* Brand block (giống ô bên trái trong ảnh) */}
                <div className="grid h-12 min-w-[92px] place-items-center">
                    <Link
                        href="/"
                        className="text-sm font-semibold tracking-wide"
                    >
                        O V L A B
                    </Link>
                </div>

                {/* Filler để thanh căn đúng layout */}
                <div className="flex-1" />

                {/* Right controls */}
                <div className="flex items-center gap-3 pr-3">
                    <SystemStatus /> {/* hiển thị chấm xanh + “System Online” */}
                    <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-md bg-white text-slate-800 shadow-sm ring-1 ring-black/5 hover:bg-white"
                        aria-label="Notifications"
                    >
                        <Bell className="h-4 w-4" />
                    </Button>
                    <Link href="/account">
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 rounded-md bg-white text-slate-800 shadow-sm ring-1 ring-black/5 hover:bg-white"
                            aria-label="Account"
                        >
                            <User className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
