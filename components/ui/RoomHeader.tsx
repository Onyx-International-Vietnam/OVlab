// components/rooms/RoomPageHeader.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search as SearchIcon } from "lucide-react";
import CreateRoomDialog from "@/components/dialogs/CreateRoomDialog";

type Props = {
    onSearch?: (q: string) => void;
};

export function RoomPageHeader({ onSearch }: Props) {
    const [q, setQ] = React.useState("");
    const [isCreateRoomOpen, setIsCreateRoomOpen] = React.useState(false);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        onSearch?.(q);
    }

    function handleCreateClick() {
        setIsCreateRoomOpen(true);
    }

    return (
        <>
            <div className="w-full bg-slate-100">
                <div className="container-page px-4 md:px-16 py-8">
                    {/* Title */}
                    <h1 className="mb-6 font-bold text-slate-900 text-3xl md:text-4xl text-center md:text-left">
                        Test Monitoring Rooms
                    </h1>
                    <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                        {/* Create button */}
                        <Button
                            onClick={handleCreateClick}
                            className="gap-2 bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            <Plus className="h-4 w-4" />
                            Create New Room
                        </Button>

                        {/* Search form - aligned to right */}
                        <form
                            onSubmit={submit}
                            className="flex w-full items-center gap-2 sm:ml-auto sm:w-auto"
                        >
                            <div className="relative flex-1 sm:w-96 md:w-[500px]">
                                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Sreach Room"
                                    className="h-9 w-full rounded-md bg-white pl-9 pr-3"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="h-9 shrink-0 rounded-md bg-slate-800 px-6 text-sm font-medium text-white hover:bg-slate-900"
                            >
                                Search
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <CreateRoomDialog
                open={isCreateRoomOpen}
                onOpenChange={setIsCreateRoomOpen}
            />
        </>
    );
}