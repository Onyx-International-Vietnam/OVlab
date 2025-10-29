"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CreateRoomDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateRoomDialog({
    open,
    onOpenChange,
}: CreateRoomDialogProps) {
    const [programName, setProgramName] = useState("");
    const [description, setDescription] = useState("");
    const [invitedUsers, setInvitedUsers] = useState<string[]>([
        "User name",
        "User name",
    ]);
    const [userInput, setUserInput] = useState("");

    const removeUser = (index: number) => {
        setInvitedUsers(invitedUsers.filter((_, i) => i !== index));
    };

    const handleCreateRoom = () => {
        // Logic tạo phòng
        console.log({ programName, description, invitedUsers });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md bg-white p-0 gap-0">
                {/* Header with close button */}
                <div className="flex items-center justify-between p-6 pb-4">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Create New Monitoring Room
                    </h2>
                </div>

                <div className="space-y-4 px-6 pb-6">
                    {/* Test Program Name */}
                    <div className="space-y-2">
                        <Label htmlFor="programName" className="text-sm font-medium text-slate-900">
                            Test Program Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="programName"
                            placeholder="Enter test program name"
                            value={programName}
                            onChange={(e) => setProgramName(e.target.value)}
                            className="w-full border-slate-200"
                        />
                        <p className="text-xs text-slate-500">This field is required</p>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium text-slate-900">
                            Description <span className="text-slate-400">(Optional)</span>
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Enter a brief description of the monitoring room..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-[80px] w-full resize-none border-slate-200"
                        />
                    </div>

                    {/* Invite Users */}
                    <div className="space-y-2">
                        <Label htmlFor="inviteUsers" className="text-sm font-medium text-slate-900">
                            Invite Users <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {invitedUsers.map((user, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-sm text-white"
                                >
                                    {user}
                                    <button
                                        onClick={() => removeUser(index)}
                                        className="hover:bg-blue-700 rounded-full p-0"
                                        title="Remove user"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <Input
                            id="inviteUsers"
                            placeholder="Type username or email and press Enter"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="w-full border-slate-200"
                        />
                        <p className="text-xs text-slate-500">
                            Only invited users can access this room
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="border-slate-300 text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreateRoom}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={!programName}
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Create New Room
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
