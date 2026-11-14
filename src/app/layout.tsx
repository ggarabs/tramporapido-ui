import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/header";
import CandidateSideBar from "@/components/CandidateSidebar/candidateSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tramporapido",
  description: "Painel de vagas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <Header />
        <div className="mx-auto flex w-full max-w-full flex-1 flex-col items-start gap-6 p-4 sm:flex-row sm:p-6">
          <CandidateSideBar />
          <main className="w-full min-w-0 flex-1 flex flex-col gap-5">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
