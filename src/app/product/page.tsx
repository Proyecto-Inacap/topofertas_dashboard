'use client'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/core/products/Columns'
import { useProducts } from '@/core/products/hooks/useProducts'
import React from 'react'

const ProductPage = () => {
  const { products, isLoading } = useProducts({ limit: 10, page: 1 })

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <DataTable columns={columns} data={products || []} />
    </div>
  )
}

export default ProductPage