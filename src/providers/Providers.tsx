"use client";
import React from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
interface Props {
  children: React.ReactNode;
}
const Providers = ({ children }: Props) => {
  return (
    <SWRConfig>
      <SessionProvider>
        <ThemeProvider attribute="class" enableSystem>
          {children}
        </ThemeProvider>
      </SessionProvider>
    </SWRConfig>
  );
};

export default Providers;
