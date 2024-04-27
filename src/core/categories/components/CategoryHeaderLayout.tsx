'use client'
import { Button } from '@/components/ui/button';
import { useCategoryModal } from '@/store/categories/useCategoryModal';
import React from 'react'

const CategoryHeaderLayout = () => {
  const { setCreateIsOpen } = useCategoryModal();

  return (
    <div className='flex justify-between mb-2'>
      <h1 className="text-2xl font-bold">Categorías</h1>
      <Button
        onClick={() => setCreateIsOpen(true)}
      >
        Crear Categoría
      </Button>
    </div >
  )
}

export default CategoryHeaderLayout