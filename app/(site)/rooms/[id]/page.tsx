import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getRoom, KEY_METRICS, PARTICIPANTS, REPORTS } from "@/lib/data";
import StressStrainChart from "@/components/ui/StressStrainChart";
import KeyMetric from "@/components/ui/KeyMetric";
import { Settings, Users, Database, Download, FileText, Play, Volume2, Maximize } from "lucide-react";

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const room = getRoom(params.id);
  const isLive = room.status === "LIVE";
  const participants = PARTICIPANTS[room.id] ?? [];
  const reports = REPORTS[room.id] ?? [];

  return (
    <div className="container p-4 md:p-6 lg:p-10 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_420px]">
      {/* LEFT: Image + header */}
      <section className="space-y-4">
        {/* Title row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Badge className={isLive ? "bg-red-500" : "bg-slate-500"}>
              {isLive ? "Live" : "Offline"}
            </Badge>
            <h2 className="truncate text-lg sm:text-xl font-semibold">{room.title}</h2>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none">
              <Link href={`/rooms/${params.id}/settings` as Route} className="inline-flex items-center gap-1">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
            </Button>
            <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800 flex-1 sm:flex-none" asChild>
              <Link href={`/rooms/${params.id}/data` as Route}>Data</Link>
            </Button>
          </div>
        </div>

        {/* Image (thay cho video) */}
        <div className="overflow-hidden rounded-xl border bg-black shadow-lg">
          <div className="relative aspect-video w-full">
            <Image
              src="/images/video.png"
              alt={room.title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
              priority
            />
            {isLive && (
              <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white shadow">
                • Live
              </span>
            )}
          </div>

          {/* Thanh điều khiển giả lập (không phát video) */}
          <div className="flex items-center gap-3 bg-slate-900 px-3 py-2 text-white">
            <button
              type="button"
              className="grid h-7 w-7 place-items-center rounded-full bg-slate-800"
              title="Play (mock)"
            >
              <Play className="h-4 w-4" />
            </button>

            <Volume2 className="h-4 w-4 opacity-80" />

            <div className="relative mx-2 h-1 flex-1 rounded bg-slate-700">
              <div className="absolute inset-y-0 left-0 w-1/2 rounded bg-amber-400" />
              <span className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-amber-400" />
            </div>

            <span className="text-xs opacity-80">28:09</span>

            <button
              type="button"
              className="grid h-7 w-7 place-items-center rounded-md bg-slate-800"
              title="Fullscreen (mock)"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* RIGHT: Tabs card */}
      <aside className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Tabs defaultValue="live" className="w-full h-full flex flex-col">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 flex-shrink-0">
            <TabsTrigger value="live" className="rounded-none px-3 sm:px-5 py-3 text-xs sm:text-sm
                   data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 font-medium data-[state=active]:border-b-3 data-[state=active]:border-b-blue-700">
              Live Data
            </TabsTrigger>
            <TabsTrigger value="participants" className="rounded-none px-3 sm:px-5 py-3 text-xs sm:text-sm data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 font-medium data-[state=active]:border-b-3 data-[state=active]:border-b-blue-700">
              Participants
            </TabsTrigger>
            <TabsTrigger value="data" className="rounded-none px-3 sm:px-5 py-3 text-xs sm:text-sm data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 font-medium data-[state=active]:border-b-3 data-[state=active]:border-b-blue-700">
              Data &amp; Download
            </TabsTrigger>
          </TabsList>

          {/* TAB: Live Data */}
          <TabsContent value="live" className="space-y-6 p-4 sm:p-5 overflow-y-auto">
            <div>
              <h3 className="mb-3 font-semibold">Stress–Strain Curve</h3>
              <StressStrainChart />
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Key Metrics</h3>
              <div className="space-y-3">
                {KEY_METRICS.map((m) => (
                  <KeyMetric key={m.id} label={m.label} value={m.value} kind={m.icon} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB: Participants */}
          <TabsContent value="participants" className="space-y-4 p-4 sm:p-5 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-semibold">
                <Users className="h-4 w-4" />
                Participants ({participants.length})
              </h3>
              <Button size="sm">+ Invite User</Button>
            </div>

            <ul className="space-y-3">
              {participants.map((p, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg border bg-white p-3">
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-slate-500">{p.online ? "Active Now" : "Offline"}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${p.online ? "bg-green-500" : "bg-slate-300"}`} />
                    <Badge
                      variant="secondary"
                      className={
                        p.role === "Owner"
                          ? "bg-violet-100 text-violet-700"
                          : "bg-slate-100 text-slate-700"
                      }
                    >
                      {p.role}
                    </Badge>
                  </div>
                </li>
              ))}
              {participants.length === 0 && (
                <li className="rounded-lg border bg-white p-3 text-sm text-slate-500">No participants.</li>
              )}
            </ul>
          </TabsContent>

          {/* TAB: Data & Download */}
          <TabsContent value="data" className="space-y-4 p-4 sm:p-5 overflow-y-auto">
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 font-semibold text-sm sm:text-base">
                <Database className="h-4 w-4" />
                Test Reports
              </h3>
              <div className="flex flex-col gap-2">
                <Button
                  className="flex-1 h-10 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-xs sm:text-sm shadow-sm"
                >
                  <Database className="mr-2 h-4 w-4" />
                  Retrieve and View Test Data
                </Button>

                {/* Nút 2: nền trắng, có viền, chữ đen */}
                <Button
                  variant="outline"
                  className="flex-1 h-10 rounded-md bg-white text-slate-900 border-slate-200 hover:bg-white text-xs sm:text-sm shadow-sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Report (.pdf)
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Recent Reports</h4>
              <ul className="space-y-2">
                {reports.map((r) => (
                  <li key={r.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 rounded-lg border bg-white px-3 py-2">
                    <div className="flex min-w-0 items-center gap-3 flex-1">
                      <span className="grid h-8 w-8 place-items-center rounded-md bg-red-50 text-red-600 flex-shrink-0">
                        <FileText className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="truncate font-medium text-sm">{r.title}</div>
                        <div className="text-xs text-slate-500">
                          {new Date(r.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </li>
                ))}
                {reports.length === 0 && (
                  <li className="rounded-lg border bg-white px-3 py-2 text-sm text-slate-500">
                    No reports found.
                  </li>
                )}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </aside>
    </div>
  );
}
