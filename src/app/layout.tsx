import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import MainNav from '@/components/ui/MainNav';

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
    <html lang="en">
      <body className={inter.className}>
        <MainNav />
        <main className='container max-w-screen-2xl p-4'>
          {children}
        </main>
      </body>
    </html>
  );
}
