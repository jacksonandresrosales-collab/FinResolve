import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "FinResolve - Portal",
  description: "Plataforma para la gestión y priorización de reclamos financieros",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <body>
        <div className="flex h-screen overflow-hidden bg-[var(--background)]">
          <Sidebar />
          <div className="flex-1 flex flex-col md:ml-64 relative min-w-0">
            <Topbar />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto w-full">
                {children}
              </div>
            </main>
          </div>
        </div>
        <Toaster theme="dark" position="top-right" />
      </body>
    </html>
  );
}
