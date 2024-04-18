'use client'
import { useLoadingState } from '@/store/loadingState'
import { Loader2 } from 'lucide-react';
import React from 'react'

const LoadingToast = () => {
  const { loadingState } = useLoadingState()

  if (!loadingState) return null

  return (
    <div className='fixed right-5 bottom-5 bg-background border-primary/40 border-1 border rounded-md p-2 w-10 h-10'>
        <Loader2 className={'animate-spin'} color={"white"} />
    </div>
  );
}

export default LoadingToast