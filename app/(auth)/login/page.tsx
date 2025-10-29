"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    return (
        <div
            className="min-h-screen w-full px-4"
            style={{
                background: "linear-gradient(180deg, #F9FAFB 0%, #E2F0FF 100%)",
            }}
        >
            {/* Title */}
            <div className="pt-10 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">
                    O V L A B
                </h1>
            </div>

            {/* Card */}
            <div className="grid min-h-[70vh] place-items-center">
                <div className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white/90 p-6 shadow-lg">
                    <div className="mb-5">
                        <h2 className="text-xl font-semibold">Login</h2>
                        <p className="text-sm text-slate-500">Welcome back to O V L A B</p>
                    </div>

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="you@example.com" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Enter password" />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex cursor-pointer select-none items-center gap-2">
                                <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                                Remember me
                            </label>
                            <Link href="#" className="text-slate-600 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <Button asChild className="w-full bg-blue-600 text-white hover:bg-blue-700">
                            <Link href="/">Login</Link>
                        </Button>

                        <p className="text-center text-xs text-slate-500">
                            This is a private system. Please contact your administrator for an account.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
