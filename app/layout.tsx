import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INEVITABLE - Tu próximo trabajo",
  description: "Diagnóstico y optimización de CV con IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
