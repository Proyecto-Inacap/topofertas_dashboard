'use client'
import { DataTable } from '@/components/ui/data-table'
import { limits } from '@/constants'
import { columns } from '@/core/products/Columns'
import { useProducts } from '@/core/products/hooks/useProducts'
import { PaginationState } from '@tanstack/react-table'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface Props {
  limit: number
  page: number
}

const ProductTable = ({ limit, page }: Props) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: page,
    pageSize: limit,
  });

  const { products, count, isLoading } = useProducts({ limit: pageSize, page: pageIndex })


  return (
    <div>
      <DataTable columns={columns} data={products || []} pageIndex={pageIndex} pageSize={pageSize} setPagination={setPagination} count={count || 0} />
    </div>
  )
}

export default ProductTable