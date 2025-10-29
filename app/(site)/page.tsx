// app/(site)/rooms/page.tsx
"use client";

import RoomGrid from "@/components/ui/RoomGrid";
import { RoomPageHeader } from "@/components/ui/RoomHeader";
import { useRouter } from "next/navigation";

export default function RoomsPage() {
  const router = useRouter();

  return (
    <>
      <RoomPageHeader
        onSearch={(q) => console.log("search:", q)}
      />
      <RoomGrid />
    </>
  );
}
