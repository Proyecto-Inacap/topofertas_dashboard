'use client'
import { Button } from '@/components/ui/button';
import { useStoreModal } from '@/store/stores/useStoreModal';
import React from 'react'

const CouponHeaderLayout = () => {
  const { setIsOpen } = useStoreModal();

  return (
    <div className='flex justify-between mb-2'>
      <h1 className="text-2xl font-bold">Cupones</h1>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Crear Cupón
      </Button>
    </div>
  )
}

export default CouponHeaderLayout