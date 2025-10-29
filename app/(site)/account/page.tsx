// app/(site)/account/page.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Shield, User, Mail, Calendar, Clock, Lock, Edit2, Check, X } from "lucide-react";

type User = {
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Operator" | "Viewer";
  status: "Online" | "Offline";
  joinedAt: string;
  lastActive: string;
  avatar?: string;
};

const CURRENT_USER: User = {
  name: "Alex Carter",
  email: "alex@ovlab.io",
  role: "Operator",
  status: "Online",
  joinedAt: "2024-05-12T08:30:00Z",
  lastActive: new Date().toISOString(),
  avatar: "https://i.pravatar.cc/128?u=alex",
};

export default function AccountPage() {
  const [editable, setEditable] = React.useState(false);
  const [form, setForm] = React.useState({
    name: CURRENT_USER.name,
    email: CURRENT_USER.email,
  });

  function onSave() {
    // demo only
    alert(`Saved:\nName: ${form.name}\nEmail: ${form.email}`);
    setEditable(false);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Clean Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-page px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">
                Account Settings
              </h1>
              <p className="text-slate-600">
                Manage your profile and security preferences
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
              <div className={`h-2 w-2 rounded-full ${CURRENT_USER.status === "Online" ? "bg-green-500" : "bg-slate-400"}`} />
              <span className="text-sm font-medium text-slate-700">{CURRENT_USER.status}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page px-6 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
          {/* Left: Profile Card */}
          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative group mb-4">
                    <div className="relative h-28 w-28 overflow-hidden rounded-2xl ring-2 ring-slate-200">
                      {CURRENT_USER.avatar ? (
                        <Image
                          src={CURRENT_USER.avatar}
                          alt={CURRENT_USER.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Avatar className="h-28 w-28 text-2xl rounded-2xl">
                          <AvatarFallback className="bg-slate-900 text-white rounded-2xl">
                            {CURRENT_USER.name
                              .split(" ")
                              .map((s) => s[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`absolute bottom-2 right-2 h-4 w-4 rounded-full ring-2 ring-white ${
                        CURRENT_USER.status === "Online" ? "bg-green-500" : "bg-slate-400"
                      }`} />
                    </div>
                    <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-9 px-3 rounded-full bg-slate-900 text-white text-sm font-medium flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg opacity-0 group-hover:opacity-100">
                      <Camera className="h-3.5 w-3.5" />
                      Change
                    </button>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mb-1">
                    {CURRENT_USER.name}
                  </h2>
                  <p className="text-sm text-slate-600 mb-3 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    {CURRENT_USER.email}
                  </p>
                  <Badge
                    variant="secondary"
                    className={`${
                      CURRENT_USER.role === "Owner"
                        ? "bg-violet-100 text-violet-700 hover:bg-violet-100"
                        : CURRENT_USER.role === "Admin"
                        ? "bg-rose-100 text-rose-700 hover:bg-rose-100"
                        : CURRENT_USER.role === "Operator"
                        ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-100"
                    } font-semibold border-0`}
                  >
                    {CURRENT_USER.role}
                  </Badge>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Joined</div>
                        <div className="text-sm font-semibold text-slate-900">
                          {new Date(CURRENT_USER.joinedAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-green-50 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Last active</div>
                        <div className="text-sm font-semibold text-slate-900">
                          {new Date(CURRENT_USER.lastActive).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  variant={editable ? "outline" : "default"}
                  className={`w-full mt-6 ${
                    editable 
                      ? "border-slate-300 text-slate-700" 
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                  onClick={() => setEditable((v) => !v)}
                >
                  {editable ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right: Information Cards */}
          <div className="space-y-6">
            {/* Profile Information */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100 bg-white pb-4">
                <CardTitle className="flex items-center gap-2.5 text-slate-900 text-lg">
                  <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-slate-700" />
                  </div>
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-900 font-semibold text-sm">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={form.name}
                      disabled={!editable}
                      className={`h-11 ${
                        editable 
                          ? "border-slate-300 bg-white focus:border-blue-500 focus:ring-blue-500" 
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-900 font-semibold text-sm">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      disabled={!editable}
                      className={`h-11 ${
                        editable 
                          ? "border-slate-300 bg-white focus:border-blue-500 focus:ring-blue-500" 
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-900 font-semibold text-sm">Role</Label>
                    <Input value={CURRENT_USER.role} disabled className="h-11 bg-slate-50 border-slate-200 text-slate-600" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-900 font-semibold text-sm">Status</Label>
                    <Input value={CURRENT_USER.status} disabled className="h-11 bg-slate-50 border-slate-200 text-slate-600" />
                  </div>

                  {editable && (
                    <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                      <Button
                        variant="outline"
                        className="border-slate-300"
                        onClick={() => {
                          setForm({ name: CURRENT_USER.name, email: CURRENT_USER.email });
                          setEditable(false);
                        }}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        onClick={onSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100 bg-white pb-4">
                <CardTitle className="flex items-center gap-2.5 text-slate-900 text-lg">
                  <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-slate-700" />
                  </div>
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Password Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Lock className="h-3.5 w-3.5 text-slate-700" />
                      </div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Change Password
                      </h3>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2 space-y-2">
                        <Label htmlFor="cur" className="text-slate-900 font-semibold text-sm">
                          Current Password
                        </Label>
                        <Input 
                          id="cur" 
                          type="password" 
                          placeholder="Enter your current password"
                          className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new" className="text-slate-900 font-semibold text-sm">
                          New Password
                        </Label>
                        <Input 
                          id="new" 
                          type="password" 
                          placeholder="Enter new password"
                          className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm" className="text-slate-900 font-semibold text-sm">
                          Confirm Password
                        </Label>
                        <Input 
                          id="confirm" 
                          type="password" 
                          placeholder="Confirm new password"
                          className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                      <Lock className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </div>

                  {/* 2FA Section */}
                  <div className="pt-6 border-t border-slate-100">
                    <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-start gap-4">
                        <div className="h-11 w-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                          <Shield className="h-5 w-5 text-slate-700" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Two-Factor Authentication
                          </h4>
                          <p className="text-sm text-slate-600 mb-3">
                            Enhance your account security with an additional verification step.
                          </p>
                          <Badge variant="secondary" className="bg-white border-slate-200 text-slate-700">
                            Coming Soon
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
