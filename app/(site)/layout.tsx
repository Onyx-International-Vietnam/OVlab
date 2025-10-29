// app/(site)/layout.tsx
import Topbar from "@/components/layout/Topbar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Topbar />
      {children}
    </>
  );
}
