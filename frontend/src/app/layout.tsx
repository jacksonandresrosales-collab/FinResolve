import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinResolve",
  description: "Plataforma para la gestión y priorización de reclamos financieros",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
