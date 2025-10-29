// app/invite/[token]/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getInvitation, getRoomTitle } from "@/lib/data";

type Decision = "none" | "accepted" | "declined";

export default function InviteTokenPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const invite = useMemo(() => getInvitation(params.token), [params.token]);
  const [decision, setDecision] = useState<Decision>("none");

  // Guard sớm: nếu không có lời mời thì thoát luôn
  if (!invite) {
    return (
      <div className="container-page grid min-h-[70vh] place-items-center">
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Invitation not found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-600">
              This invitation link is invalid or has been revoked.
            </p>
            <Button onClick={() => router.push("/rooms" as Route)}>Back to rooms</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Từ đây trở đi chắc chắn có invite ⇒ dùng biến 'inv' để TS hiểu rõ
  const inv = invite;

  const expired = new Date(inv.expiresAt).getTime() < Date.now();
  const isRevoked = inv.status === "Revoked";
  const initiallyAccepted = inv.status === "Accepted";
  const isAccepted = initiallyAccepted || decision === "accepted";
  const isDeclined = decision === "declined";

  const statusColor =
    expired ? "bg-slate-500" :
    isRevoked ? "bg-red-600" :
    isAccepted ? "bg-green-600" :
    "bg-amber-600";

  const goRoom = () => router.push((`/rooms/${inv.roomId}` as Route));

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-slate-50 to-white py-10">
      <div className="container-page">
        <Card className="mx-auto max-w-xl">
          <CardHeader>
            <CardTitle>Room Invitation</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Room & status */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">Room</div>
                <div className="text-lg font-semibold">
                  {getRoomTitle(inv.roomId)}
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  Invited email: <span className="font-medium">{inv.email}</span>
                </div>
              </div>
              <Badge className={statusColor}>
                {expired ? "Expired" : isRevoked ? "Revoked" : isAccepted ? "Accepted" : inv.status}
              </Badge>
            </div>

            {/* Dates */}
            <div className="grid gap-1 text-xs text-slate-500">
              <div>Created: {new Date(inv.createdAt).toLocaleString()}</div>
              <div>Expires: {new Date(inv.expiresAt).toLocaleString()}</div>
            </div>

            {/* Actions */}
            {expired || isRevoked ? (
              <div className="flex items-center gap-3">
                <Button onClick={() => router.push("/rooms" as Route)}>Back to rooms</Button>
              </div>
            ) : isAccepted ? (
              <div className="flex items-center gap-3">
                <Button className="flex-1" onClick={goRoom}>Go to room</Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => router.push("/rooms" as Route)}
                >
                  Back to rooms
                </Button>
              </div>
            ) : isDeclined ? (
              <div className="flex items-center gap-3">
                <Button onClick={() => router.push("/rooms" as Route)}>Back to rooms</Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button className="flex-1" onClick={() => setDecision("accepted")}>
                  Accept
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setDecision("declined")}
                >
                  Decline
                </Button>
              </div>
            )}

            {decision !== "none" && !expired && !isRevoked && (
              <p className="text-xs text-slate-500">
                You have {decision}. You can proceed to the room or go back to rooms.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
