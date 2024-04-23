'use client'
import { Button } from '@/components/ui/button';
import { useUserModal } from '@/store/users/useUserModal';
import React from 'react'

const UserHeaderLayout = () => {
  const { isOpen, setIsOpen } = useUserModal();

  return (
    <div className='flex justify-between mb-2'>
      <h1 className="text-2xl font-bold">Usuarios</h1>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Crear Usuario
        </Button>
    </div>
  )
}

export default UserHeaderLayout