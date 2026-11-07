import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "tramporapido | Vagas perto de você",
  description: "Encontre oportunidades de trabalho e acompanhe seu currículo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
