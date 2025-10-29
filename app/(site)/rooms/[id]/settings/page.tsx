"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRoom, INVITATIONS, ROOM_ACCESS } from "@/lib/data";
import { Link as LinkIcon, Ban, Plus, Mail, Shield, X, Copy, Check, Settings } from "lucide-react";

export default function RoomSettings({
  params,
}: {
  params: { id: string };
}) {
  const room = getRoom(params.id);
  const [emails, setEmails] = React.useState<string[]>(
    ROOM_ACCESS[room.id] ?? []
  );
  const [emailInput, setEmailInput] = React.useState("");
  const [invites, setInvites] = React.useState(
    INVITATIONS.filter((i) => i.roomId === room.id)
  );
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);

  function addEmail() {
    const v = emailInput.trim();
    if (!v || emails.includes(v)) return;
    setEmails((p) => [...p, v]);
    setEmailInput("");
  }

  function removeEmail(v: string) {
    setEmails((p) => p.filter((x) => x !== v));
  }

  function createInvite() {
    const email = prompt("Enter email to invite:");
    if (!email) return;
    const token = `tok-${Date.now()}`;
    const item = {
      token,
      roomId: room.id,
      email,
      status: "Pending" as const,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    };
    setInvites((p) => [item, ...p]);
    const url = `${location.origin}/invite/${token}`;
    navigator.clipboard.writeText(url).catch(() => {});
    alert(`Invitation created and copied to clipboard:\n${url}`);
  }

  function revokeInvite(token: string) {
    setInvites((p) =>
      p.map((x) => (x.token === token ? { ...x, status: "Revoked" as const } : x))
    );
  }

  function copyLink(token: string) {
    const url = `${location.origin}/invite/${token}`;
    navigator.clipboard.writeText(url).then(
      () => {
        setCopiedToken(token);
        setTimeout(() => setCopiedToken(null), 2000);
      },
      () => alert(url)
    );
  }

  return (
    <div className="min-h-[calc(100svh-48px)] bg-slate-50">
      <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="h-14 w-14 rounded-xl bg-slate-900 flex items-center justify-center shadow-sm">
              <Settings className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Room Settings
              </h1>
              <p className="text-slate-600 text-base md:text-lg">
                Manage access and invitations for <span className="font-semibold text-slate-900">{room.title}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Access Control Card */}
          <Card className="border-slate-200 shadow-sm bg-white">
            <CardHeader className="border-b border-slate-100 pb-5">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">Access Control</CardTitle>
                  <CardDescription className="text-sm text-slate-600">Manage who can access this room</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2 block">
                      Add email address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addEmail()}
                      className="h-11 border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <Button 
                    onClick={addEmail} 
                    className="h-11 sm:mt-[30px] bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Email
                  </Button>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-slate-700">
                      Allowed emails
                    </p>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-medium px-3">
                      {emails.length}
                    </Badge>
                  </div>
                  {emails.length === 0 ? (
                    <div className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
                      <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                        <Mail className="h-6 w-6 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-700 mb-1">No emails added yet</p>
                      <p className="text-sm text-slate-500">Add emails to grant access to this room</p>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {emails.map((e) => (
                        <div
                          key={e}
                          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-slate-300 hover:shadow-sm transition-all"
                        >
                          <Mail className="h-3.5 w-3.5 text-slate-400" />
                          <span>{e}</span>
                          <button
                            className="ml-1 text-slate-400 hover:text-red-600 transition-colors"
                            onClick={() => removeEmail(e)}
                            title="Remove email"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invitations Card */}
          <Card className="border-slate-200 shadow-sm bg-white">
            <CardHeader className="border-b border-slate-100 pb-5">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-violet-600 flex items-center justify-center">
                    <LinkIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-slate-900">Invitation Links</CardTitle>
                    <CardDescription className="text-sm text-slate-600">Create and manage invitation links</CardDescription>
                  </div>
                </div>
                <Button 
                  onClick={createInvite} 
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invite
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {invites.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <LinkIcon className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-700 mb-1">No invitations yet</p>
                  <p className="text-sm text-slate-500 mb-5">Create invitation links to share with team members</p>
                  <Button 
                    onClick={createInvite}
                    variant="outline"
                    className="border-slate-300 hover:bg-slate-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Invite
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {invites.map((i) => {
                    const expired = new Date(i.expiresAt).getTime() < Date.now();
                    const isCopied = copiedToken === i.token;
                    
                    let statusColor = "bg-amber-50 text-amber-700 border-amber-200";
                    let statusText = i.status;
                    
                    if (i.status === "Accepted") {
                      statusColor = "bg-green-50 text-green-700 border-green-200";
                    } else if (i.status === "Revoked") {
                      statusColor = "bg-red-50 text-red-700 border-red-200";
                    } else if (expired) {
                      statusColor = "bg-slate-50 text-slate-600 border-slate-200";
                      statusText = "Expired";
                    }

                    return (
                      <div
                        key={i.token}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-sm transition-all"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" />
                            <span className="font-medium text-slate-900 truncate">{i.email}</span>
                          </div>
                          <div className="text-xs text-slate-500 font-mono bg-slate-50 px-2 py-1 rounded inline-block mb-1 border border-slate-200">
                            {i.token}
                          </div>
                          <div className="text-xs text-slate-400">
                            Expires: {new Date(i.expiresAt).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <Badge className={`${statusColor} border font-medium px-2.5 py-0.5`}>
                            {statusText}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 border-slate-300 hover:bg-slate-50"
                            onClick={() => copyLink(i.token)}
                            title="Copy invite link"
                          >
                            {isCopied ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-green-600" />
                                <span className="text-green-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" />
                                Copy
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 border-slate-300 text-red-600 hover:bg-red-50 hover:border-red-300"
                            onClick={() => revokeInvite(i.token)}
                            disabled={i.status === "Revoked"}
                            title="Revoke invitation"
                          >
                            <Ban className="h-3.5 w-3.5" />
                            Revoke
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
