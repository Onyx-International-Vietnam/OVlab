// app/admin/reports/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { REPORTS } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function AdminReports() {
  const list = Object.values(REPORTS).flat();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {list.map((r) => (
            <li
              key={r.id}
              className="flex items-center justify-between rounded-lg border bg-white px-3 py-2"
            >
              <div>
                <div className="font-medium">{r.title}</div>
                <div className="text-xs text-slate-500">
                  {new Date(r.date).toLocaleDateString()}
                </div>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </li>
          ))}
          {list.length === 0 && (
            <li className="rounded-lg border bg-white px-3 py-2 text-sm text-slate-500">
              No reports.
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
