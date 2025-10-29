// app/admin/users/page.tsx
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, ArrowUpDown } from "lucide-react";

type Role = "Admin" | "Operator" | "Viewer";
type UserRow = { id: string; name: string; email: string; role: Role };
type SortKey = "name" | "email" | "role";

const INITIAL_USERS: UserRow[] = [
  { id: "u1", name: "Alice Johnson", email: "alice@ovlab.io", role: "Admin" },
  { id: "u2", name: "Bob Lee", email: "bob@ovlab.io", role: "Operator" },
  { id: "u3", name: "Chris Ray", email: "chris@ovlab.io", role: "Viewer" },
  { id: "u4", name: "Diana Pham", email: "diana@ovlab.io", role: "Operator" },
  { id: "u5", name: "Evan Phan", email: "evan@ovlab.io", role: "Viewer" },
];

const roleBadge = (role: Role) =>
  role === "Admin"
    ? "bg-violet-100 text-violet-700"
    : role === "Operator"
    ? "bg-amber-100 text-amber-700"
    : "bg-slate-100 text-slate-700";

export default function AdminUsers() {
  const [query, setQuery] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<Role | "All">("All");
  const [users, setUsers] = React.useState<UserRow[]>(INITIAL_USERS);
  const [sortBy, setSortBy] = React.useState<SortKey>("name");
  const [asc, setAsc] = React.useState(true);

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase().trim();
    return users.filter((u) => {
      const matchQ =
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q);
      const matchRole = roleFilter === "All" ? true : u.role === roleFilter;
      return matchQ && matchRole;
    });
  }, [users, query, roleFilter]);

  const sorted = React.useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let comp = 0;
      if (sortBy === "name") comp = a.name.localeCompare(b.name);
      if (sortBy === "email") comp = a.email.localeCompare(b.email);
      if (sortBy === "role") comp = a.role.localeCompare(b.role);
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

  function handleInvite() {
    const name = prompt("User name?");
    if (!name) return;
    const email = prompt("Email?");
    if (!email) return;
    const role = (prompt('Role? ("Admin" | "Operator" | "Viewer")', "Viewer") ??
      "Viewer") as Role;
    setUsers((prev) => [{ id: `u-${Date.now()}`, name, email, role }, ...prev]);
  }

  function handleEdit(u: UserRow) {
    const name = prompt("New name:", u.name) ?? u.name;
    const email = prompt("New email:", u.email) ?? u.email;
    const role = (prompt(
      'New role? ("Admin" | "Operator" | "Viewer")',
      u.role
    ) ?? u.role) as Role;
    setUsers((prev) =>
      prev.map((x) => (x.id === u.id ? { ...x, name, email, role } : x))
    );
  }

  function handleRemove(u: UserRow) {
    if (!confirm(`Remove user "${u.name}"?`)) return;
    setUsers((prev) => prev.filter((x) => x.id !== u.id));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search by name / email / role"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-[260px]"
            />
            <div className="flex items-center gap-2">
              <label htmlFor="role" className="text-sm text-slate-600">
                Role:
              </label>
              <select
                id="role"
                className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm"
                value={roleFilter}
                onChange={(e) =>
                  setRoleFilter((e.target.value as Role | "All") ?? "All")
                }
              >
                <option value="All">All</option>
                <option value="Admin">Admin</option>
                <option value="Operator">Operator</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
          </div>

          <Button onClick={handleInvite} className="gap-2">
            <Plus className="h-4 w-4" /> Invite
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[28%]">
                <button
                  type="button"
                  onClick={() => toggleSort("name")}
                  className="inline-flex items-center gap-1"
                  title="Sort by name"
                >
                  Name <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>
              <TableHead className="w-[32%]">
                <button
                  type="button"
                  onClick={() => toggleSort("email")}
                  className="inline-flex items-center gap-1"
                  title="Sort by email"
                >
                  Email <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>
              <TableHead className="w-[15%]">
                <button
                  type="button"
                  onClick={() => toggleSort("role")}
                  className="inline-flex items-center gap-1"
                  title="Sort by role"
                >
                  Role <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>
              <TableHead className="w-[25%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

        <TableBody>
            {sorted.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Badge className={roleBadge(u.role)}>{u.role}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleEdit(u)}
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleRemove(u)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-sm text-slate-500">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
