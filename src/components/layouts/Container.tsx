import { cn } from '@/utils/cn'
import React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> { 
    children: React.ReactNode
}

const Container : React.FC<ContainerProps> = ({ children,className }) => {
  return (
    <div className={cn(className,"container max-w-screen-2xl")}>
        {children}
    </div>
  )
}

export default Container