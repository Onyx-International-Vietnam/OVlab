// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "vietnamese"], // nếu báo lỗi subset, đổi thành ["latin", "latin-ext"]
  display: "swap",
});

export const metadata: Metadata = {
  title: "OVLAB",
  description: "Test monitoring UI (client + admin)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${inter.className} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
