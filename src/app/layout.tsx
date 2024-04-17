import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import MainNav from '@/components/MainNav';
import { ThemeProvider } from "@/components/ThemeProvider";
import { SWRConfig } from 'swr';

const inter = Quicksand({
  subsets: ["latin"], weight: [
    '300', '400', '500', '600', '700']
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
      <body className={inter.className} >
        <ThemeProvider attribute="class" enableSystem>
          <MainNav />
          <main className='container max-w-screen-2xl py-4 w-[90%]'>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
