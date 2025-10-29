// app/admin/invitations/page.tsx
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { INVITATIONS, getRoomTitle } from "@/lib/data";
import { Plus, Link as LinkIcon, Ban } from "lucide-react";

export default function AdminInvitations() {
  const [items, setItems] = React.useState(INVITATIONS);
  const [query, setQuery] = React.useState("");

  const filtered = items.filter((i) => {
    const q = query.toLowerCase().trim();
    return (
      i.email.toLowerCase().includes(q) ||
      getRoomTitle(i.roomId).toLowerCase().includes(q) ||
      i.status.toLowerCase().includes(q)
    );
  });

  function createInvite() {
    const email = prompt("Invite email?");
    const roomId = prompt("Room id? (e.g., r-carbon)") || "r-carbon";
    if (!email) return;
    const token = `tok-${Date.now()}`;
    setItems((p) => [
      ...p,
      {
        token,
        email,
        roomId,
        status: "Pending",
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      },
    ]);
    alert(`Invite link: ${location.origin}/invite/${token}`);
  }

  function revoke(token: string) {
    setItems((p) =>
      p.map((x) => (x.token === token ? { ...x, status: "Revoked" } : x))
    );
  }

  function copyLink(token: string) {
    const url = `${location.origin}/invite/${token}`;
    navigator.clipboard.writeText(url);
    alert("Copied: " + url);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invitations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between gap-2">
          <Input
            placeholder="Search by email / room / status"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={createInvite} className="gap-2">
            <Plus className="h-4 w-4" /> Create
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((i) => (
              <TableRow key={i.token}>
                <TableCell className="font-medium">{i.email}</TableCell>
                <TableCell>{getRoomTitle(i.roomId)}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      i.status === "Accepted"
                        ? "bg-green-600"
                        : i.status === "Pending"
                        ? "bg-amber-600"
                        : i.status === "Expired"
                        ? "bg-slate-500"
                        : "bg-red-600"
                    }
                  >
                    {i.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(i.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(i.expiresAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => copyLink(i.token)}
                    >
                      <LinkIcon className="h-4 w-4" />
                      Copy link
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="gap-1"
                      onClick={() => revoke(i.token)}
                    >
                      <Ban className="h-4 w-4" />
                      Revoke
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-sm text-slate-500">
                  No invitations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
