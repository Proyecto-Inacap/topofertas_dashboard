'use client'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/core/products/Columns'
import { useProducts } from '@/core/products/hooks/useProducts'
import { PaginationState } from '@tanstack/react-table'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const ProductPage = () => {
  const router = useSearchParams()
  console.log(router.get('page'))
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: Number(router.get('page'))-1 || 0,
    pageSize: 10,
  });
  const { products, count, isLoading } = useProducts({ limit: pageSize, page: pageIndex + 1 })


  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      <DataTable columns={columns} data={products || []} pageIndex={pageIndex} pageSize={pageSize} setPagination={setPagination} count={count || 0} />
    </div>
  )
}

export default ProductPage