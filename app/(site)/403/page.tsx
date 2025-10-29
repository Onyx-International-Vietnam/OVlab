// app/(site)/403/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center">
      <div className="text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-slate-100">
          <Lock className="h-7 w-7 text-slate-700" />
        </div>
        <div className="text-6xl font-extrabold tracking-tight">403</div>
        <p className="mt-2 text-slate-600">
          Access denied. You don't have permission to view this page.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild className="bg-slate-900 text-white hover:bg-slate-800">
            <Link href="/">Back to rooms</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Go to login</Link>
          </Button>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          If you think this is a mistake, please contact your administrator.
        </p>
      </div>
    </div>
  );
}
