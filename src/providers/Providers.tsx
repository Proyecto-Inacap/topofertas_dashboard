'use client'
import React from 'react'
import { ThemeProvider } from "@/components/ThemeProvider";
import { SWRConfig } from 'swr';
interface Props {
  children: React.ReactNode
}
const Providers = ({ children }: Props) => {
  return (
    <SWRConfig>
      <ThemeProvider attribute="class" enableSystem>
        {children}
      </ThemeProvider>
    </SWRConfig>
  )
}

export default Providers