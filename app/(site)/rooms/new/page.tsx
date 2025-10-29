// app/(site)/rooms/new/page.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewRoomPage() {
  const router = useRouter();

  // Steps
  const [step, setStep] = React.useState<1 | 2 | 3>(1);

  // Basic
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");

  // Access
  const [emails, setEmails] = React.useState<string[]>([]);
  const [emailInput, setEmailInput] = React.useState("");

  const canNextFromBasic = title.trim().length > 0;

  function addEmail() {
    const v = emailInput.trim();
    if (!v) return;
    if (emails.includes(v)) return;
    setEmails((p) => [...p, v]);
    setEmailInput("");
  }
  function removeEmail(v: string) {
    setEmails((p) => p.filter((x) => x !== v));
  }

  function next() {
    setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s));
  }
  function back() {
    setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s));
  }

  function finish() {
    // Mock create → điều hướng về Rooms
    alert(
      `Created room:\n- Title: ${title || "(empty)"}\n- Desc: ${desc || "(empty)"}\n- Invites: ${
        emails.length ? emails.join(", ") : "(none)"
      }`
    );
    router.push("/");
  }

  return (
    <div className="container-page py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="border-slate-200 shadow-xl">
          <CardHeader className="space-y-3 pb-8">
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">Create New Room</CardTitle>
            <p className="text-slate-600 text-sm">Set up your collaborative workspace in just a few steps</p>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Stepper */}
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 -z-10" />
              
              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    step >= 1
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  1
                </div>
                <span className={`text-xs font-medium ${step >= 1 ? "text-blue-600" : "text-slate-400"}`}>
                  Basic Info
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    step >= 2
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  2
                </div>
                <span className={`text-xs font-medium ${step >= 2 ? "text-blue-600" : "text-slate-400"}`}>
                  Access
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    step >= 3
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  3
                </div>
                <span className={`text-xs font-medium ${step >= 3 ? "text-blue-600" : "text-slate-400"}`}>
                  Confirm
                </span>
              </div>
            </div>

            {/* Step 1: Basic */}
            {step === 1 && (
              <div className="grid gap-6 pt-4">
                <div className="grid gap-3">
                  <Label htmlFor="title" className="text-sm font-semibold text-slate-700">
                    Room Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Carbon Beam Test #102-B"
                    className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-slate-500">
                    Give your room a descriptive name that's easy to identify
                  </p>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="desc" className="text-sm font-semibold text-slate-700">
                    Description
                  </Label>
                  <Input
                    id="desc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Brief description of the room's purpose"
                    className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-slate-500">Optional but recommended</p>
                </div>
              </div>
            )}

            {/* Step 2: Access */}
            {step === 2 && (
              <div className="space-y-4 pt-4">
                <div className="grid gap-3">
                  <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                    Invite Team Members
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addEmail())}
                      placeholder="name@company.com"
                      className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Button 
                      type="button" 
                      onClick={addEmail}
                      className="h-11 px-6 bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                    >
                      Add
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500">Press Enter or click Add to invite</p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 min-h-[120px]">
                  {emails.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {emails.map((e) => (
                        <div
                          key={e}
                          className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm shadow-sm hover:shadow transition-shadow"
                        >
                          <span className="text-blue-700 font-medium">{e}</span>
                          <button
                            className="text-blue-400 hover:text-blue-600 transition-colors font-bold"
                            onClick={() => removeEmail(e)}
                            title="Remove"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-sm text-slate-400">
                      No team members invited yet
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <div className="space-y-6 pt-4">
                <div className="rounded-lg border border-blue-200 bg-blue-50/30 p-6 space-y-4">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Title</div>
                    <div className="text-base text-slate-900 font-medium">
                      {title || <span className="text-slate-400 italic">Not provided</span>}
                    </div>
                  </div>
                  
                  <div className="h-px bg-slate-200" />
                  
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Description</div>
                    <div className="text-base text-slate-900">
                      {desc || <span className="text-slate-400 italic">Not provided</span>}
                    </div>
                  </div>
                  
                  <div className="h-px bg-slate-200" />
                  
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Team Members</div>
                    {emails.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {emails.map((e) => (
                          <span
                            key={e}
                            className="inline-flex items-center rounded-lg bg-white border border-blue-200 px-3 py-1 text-sm text-blue-700 font-medium"
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="text-base text-slate-400 italic">No invitations</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Footer actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <Button 
                variant="outline" 
                onClick={back} 
                disabled={step === 1}
                className="h-11 px-6 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all"
              >
                Back
              </Button>

              {step < 3 ? (
                <Button 
                  onClick={next} 
                  disabled={step === 1 && !canNextFromBasic}
                  className="h-11 px-6 bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                >
                  Next Step →
                </Button>
              ) : (
                <Button 
                  onClick={finish}
                  className="h-11 px-6 bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                >
                  Create Room ✓
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
