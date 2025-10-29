"use client";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Room } from "@/lib/data";


export default function RoomCard({ room }: { room: Room }) {
    const live = room.status === "LIVE";
    return (
        <Card className="overflow-hidden py-0">
            <div className="relative aspect-[16/9]">
                <Image src={room.thumbnail} alt={room.title} fill className="object-cover" />
                <div className="absolute left-2 top-2">
                    <Badge variant="secondary" className={live ? "bg-red-500 text-white" : "bg-slate-500 text-white"}>
                        {live ? "Live" : "Offline"}
                    </Badge>
                </div>
            </div>
            <CardContent className="space-y-3 p-4">
                <div className="space-y-1">
                    <p className="text-sm text-slate-500">{live ? "LIVE" : "Offline"}</p>
                    <h3 className="line-clamp-1 font-medium">{room.title}</h3>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                        <Eye className="h-4 w-4" /> {room.viewers} Viewers
                    </div>
                    <Link href={`/rooms/${room.id}`}>
                        <Button variant="secondary" className="bg-slate-900 text-white hover:bg-slate-800">Join Room</Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}