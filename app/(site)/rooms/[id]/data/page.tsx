"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { getRoom, DATASETS } from "@/lib/data";
import { Database, Download, Eye, FileText, Image as ImageIcon, Video, File, Clock } from "lucide-react";

export default function RoomDataPage({
  params,
}: {
  params: { id: string };
}) {
  const room = getRoom(params.id);
  const items = DATASETS[room.id] ?? [];

  const [previewId, setPreviewId] = React.useState<string | null>(null);
  const current = items.find((x) => x.id === previewId);

  const getFileIcon = (kind: string) => {
    switch (kind) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "image":
        return <ImageIcon className="h-4 w-4" />;
      case "csv":
        return <FileText className="h-4 w-4" />;
      case "pdf":
        return <File className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  const getTypeColor = (kind: string) => {
    switch (kind) {
      case "video":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "image":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "csv":
        return "bg-green-50 text-green-700 border-green-200";
      case "pdf":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-[calc(100svh-48px)] bg-slate-50 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="h-14 w-14 rounded-xl bg-slate-900 flex items-center justify-center shadow-sm">
              <Database className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Room Data
              </h1>
              <p className="text-slate-600 text-base">
                <span className="font-semibold text-slate-900">{room.title}</span>
                <span className="text-slate-400 mx-2">•</span>
                <span>{items.length} {items.length === 1 ? 'dataset' : 'datasets'}</span>
              </p>
            </div>
          </div>
        </div>

        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="border-b border-slate-100 pb-5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle className="text-xl font-semibold text-slate-900 mb-1">Datasets</CardTitle>
                <CardDescription className="text-sm text-slate-600">Manage and preview your room data</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-medium px-3">
                {items.length} total
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {items.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-700 mb-1">No datasets found</p>
                <p className="text-sm text-slate-500">Upload your first dataset to get started</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-50">
                      <TableHead className="font-semibold text-slate-700">Name</TableHead>
                      <TableHead className="font-semibold text-slate-700">Type</TableHead>
                      <TableHead className="font-semibold text-slate-700">Size</TableHead>
                      <TableHead className="font-semibold text-slate-700">Updated</TableHead>
                      <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {items.map((d) => (
                      <TableRow key={d.id} className="hover:bg-slate-50 transition-colors">
                        <TableCell className="font-medium text-slate-900">
                          <div className="flex items-center gap-3">
                            <div className={`h-8 w-8 rounded-lg ${getTypeColor(d.kind)} flex items-center justify-center`}>
                              {getFileIcon(d.kind)}
                            </div>
                            <span>{d.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getTypeColor(d.kind)} border font-medium uppercase text-xs px-2 py-0.5 gap-1`}>
                            {getFileIcon(d.kind)}
                            {d.kind}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600 font-medium">{d.size}</TableCell>
                        <TableCell className="text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {d.updatedAt}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPreviewId(d.id)}
                              className="gap-1.5 border-slate-300 hover:bg-slate-50"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              Preview
                            </Button>
                            <Button 
                              size="sm"
                              className="gap-1.5 bg-slate-900 hover:bg-slate-800"
                            >
                              <Download className="h-3.5 w-3.5" />
                              Download
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewId} onOpenChange={() => setPreviewId(null)}>
        <DialogContent className="sm:max-w-4xl border-slate-200 shadow-lg">
          <DialogHeader className="border-b border-slate-100 pb-4">
            <DialogTitle className="text-xl font-semibold text-slate-900 flex items-center gap-3">
              <div className={`h-9 w-9 rounded-lg ${current ? getTypeColor(current.kind) : 'bg-slate-50'} flex items-center justify-center`}>
                {current && getFileIcon(current.kind)}
              </div>
              {current?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="max-h-[70vh] overflow-auto">
            {current?.kind === "video" && current.url ? (
              <video controls poster={current.poster} className="w-full rounded-lg">
                <source src={current.url} />
              </video>
            ) : current?.kind === "image" && current.url ? (
              <div className="relative aspect-video w-full bg-slate-50 rounded-lg overflow-hidden">
                <Image
                  src={current.url}
                  alt={current.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : current?.kind === "csv" ? (
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200">
                  <FileText className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-slate-700 text-sm">CSV Preview</span>
                </div>
                <pre className="rounded-lg bg-slate-50 p-4 text-sm text-slate-700 font-mono border border-slate-200 overflow-x-auto">
                  time,force{"\n"}
                  0.0,0{"\n"}
                  0.1,22{"\n"}
                  0.25,58{"\n"}
                  0.5,90{"\n"}
                  0.75,98{"\n"}
                  1.0,92
                </pre>
              </div>
            ) : current?.kind === "pdf" ? (
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-12 text-center">
                <div className="h-14 w-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
                  <File className="h-7 w-7 text-red-600" />
                </div>
                <p className="text-sm font-medium text-slate-700 mb-1">PDF Preview Not Available</p>
                <p className="text-sm text-slate-500">Click Download to view the full document</p>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
