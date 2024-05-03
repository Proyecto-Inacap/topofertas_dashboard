'use client'
import { Button } from '@/components/ui/button';
import { useCreateModal } from '@/store/useCreateModal';
import React from 'react'

interface HeaderLayoutProps {
    title: string;
    buttonLabel: string;
}

const HeaderLayout : React.FC<HeaderLayoutProps> = ({ title,buttonLabel }) => {
  const { setCreateIsOpen } = useCreateModal();

  return (
    <div className='flex justify-between mb-2'>
      <h1 className="text-2xl font-bold">{title}</h1>
      <Button
        onClick={() => {
            setCreateIsOpen(true);
        }}
      >
        {buttonLabel || "Crear"}
      </Button>
    </div>
  )
}

export default HeaderLayout