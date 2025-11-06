import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME ?? "세상의 모든 도구",
  description: "귀찮지만 필요한 도구들을 한 번에",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-4xl px-4 py-3 font-medium">세상의 모든 도구</div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-4xl px-4 py-10 text-sm text-neutral-500">
          © {new Date().getFullYear()} — 세상의 모든 도구
        </footer>
      </body>
    </html>
  );
}
