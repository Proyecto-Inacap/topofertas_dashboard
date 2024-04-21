import LoadingToast from "@/components/LoadingToast";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers/Providers";
import { cn } from "@/utils/cn";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TOPOdashboard",
  description: "TOPOdashboard - Dashboard for TOPOfertas",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(inter.className, "min-h-screen flex flex-col")}
      >
        <Providers>{children}</Providers>
        <LoadingToast />
        <Toaster />
      </body>
    </html>
  );
}
