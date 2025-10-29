// app/admin/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Rooms", value: 32 },
    { label: "Active Streams", value: 5 },
    { label: "Users", value: 128 },
    { label: "Reports", value: 246 },
  ];
  const recent = [
    { id: "a1", text: "Report generated for r-carbon", ts: "2025-10-25 14:36" },
    { id: "a2", text: "Invited new user: diana@ovlab.io", ts: "2025-10-24 09:12" },
    { id: "a3", text: "r-vibration started streaming", ts: "2025-10-23 16:02" },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader>
              <CardTitle className="text-sm text-slate-500">{s.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            Quick overview of O V L A B activities. Extend with real charts/metrics.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recent.map((i) => (
              <li
                key={i.id}
                className="flex items-center justify-between rounded-md border bg-white px-3 py-2"
              >
                <span className="text-sm">{i.text}</span>
                <span className="text-xs text-slate-500">{i.ts}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
