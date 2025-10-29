// app/admin/rooms/page.tsx
"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROOMS, type Room } from "@/lib/data";
import { Pencil, Trash2, Plus, ArrowUpDown } from "lucide-react";

type SortKey = "title" | "status" | "viewers";

export default function AdminRooms() {
  const [query, setQuery] = React.useState("");
  const [items, setItems] = React.useState<Room[]>(ROOMS);
  const [sortBy, setSortBy] = React.useState<SortKey>("title");
  const [asc, setAsc] = React.useState(true);

  // filter
  const filtered = React.useMemo(() => {
    const q = query.toLowerCase().trim();
    return items.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q) ||
        String(r.viewers).includes(q)
    );
  }, [items, query]);

  // sort
  const sorted = React.useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let comp = 0;
      if (sortBy === "title") comp = a.title.localeCompare(b.title);
      if (sortBy === "status") comp = a.status.localeCompare(b.status);
      if (sortBy === "viewers") comp = a.viewers - b.viewers;
      return asc ? comp : -comp;
    });
    return arr;
  }, [filtered, sortBy, asc]);

  function toggleSort(key: SortKey) {
    if (key === sortBy) setAsc((v) => !v);
    else {
      setSortBy(key);
      setAsc(true);
    }
  }

  function handleCreate() {
    const title = prompt("Room title?");
    if (!title) return;
    setItems((prev) => [
      {
        id: `r-${Date.now()}`,
        title,
        status: "LIVE",
        viewers: 0,
        thumbnail: "https://picsum.photos/seed/ovlab-admin/1200/800",
      },
      ...prev,
    ]);
  }

  function handleEdit(room: Room) {
    const title = prompt("New title:", room.title);
    if (!title) return;
    setItems((prev) =>
      prev.map((r) => (r.id === room.id ? { ...r, title } : r))
    );
  }

  function handleDelete(room: Room) {
    const ok = confirm(`Delete "${room.title}"?`);
    if (!ok) return;
    setItems((prev) => prev.filter((r) => r.id !== room.id));
  }

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Rooms</h2>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search by title / status / viewers"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-[260px]"
          />
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" /> Create
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">
              <button
                type="button"
                onClick={() => toggleSort("title")}
                className="inline-flex items-center gap-1"
                title="Sort by title"
              >
                Title <ArrowUpDown className="h-3.5 w-3.5" />
              </button>
            </TableHead>
            <TableHead className="w-[15%]">
              <button
                type="button"
                onClick={() => toggleSort("status")}
                className="inline-flex items-center gap-1"
                title="Sort by status"
              >
                Status <ArrowUpDown className="h-3.5 w-3.5" />
              </button>
            </TableHead>
            <TableHead className="w-[15%]">
              <button
                type="button"
                onClick={() => toggleSort("viewers")}
                className="inline-flex items-center gap-1"
                title="Sort by viewers"
              >
                Viewers <ArrowUpDown className="h-3.5 w-3.5" />
              </button>
            </TableHead>
            <TableHead className="w-[30%] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sorted.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{r.title}</TableCell>
              <TableCell>
                <Badge
                  className={
                    r.status === "LIVE"
                      ? "bg-red-500 text-white"
                      : "bg-slate-500 text-white"
                  }
                >
                  {r.status}
                </Badge>
              </TableCell>
              <TableCell>{r.viewers}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => handleEdit(r)}
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-1"
                    onClick={() => handleDelete(r)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {sorted.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="py-10 text-center text-sm text-slate-500">
                No rooms found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
