// components/rooms/RoomGrid.tsx
"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import RoomCard from "./RoomCard";
import { ROOMS, type Room } from "@/lib/data";

export default function RoomGrid() {
  const [query, setQuery] = React.useState("");
  const [items, setItems] = React.useState<Room[]>(ROOMS);
  const [newTitle, setNewTitle] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"ALL" | "LIVE" | "OFFLINE">("ALL");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 8;

  const filtered = items.filter((r) => {
    const matchesQuery = r.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [query, statusFilter]);

  return (
    <div className="container-page my-10 px-4 md:px-16">
      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2 justify-center">
        <Button
          variant={statusFilter === "ALL" ? "default" : "outline"}
          onClick={() => setStatusFilter("ALL")}
          className="rounded-full"
        >
          All Rooms
        </Button>
        <Button
          variant={statusFilter === "LIVE" ? "default" : "outline"}
          onClick={() => setStatusFilter("LIVE")}
          className="rounded-full"
        >
          Live
        </Button>
        <Button
          variant={statusFilter === "OFFLINE" ? "default" : "outline"}
          onClick={() => setStatusFilter("OFFLINE")}
          className="rounded-full"
        >
          Offline
        </Button>
      </div>

      {/* Grid - 4 columns like in the image */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedItems.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(page)}
                className="h-9 w-9"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
