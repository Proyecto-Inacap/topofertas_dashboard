'use client'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/core/products/Columns'
import { useProducts } from '@/core/products/hooks/useProducts'
import { useLoadingState } from '@/store/loadingState'
import { PaginationState } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'

interface Props {
  limit: number
  page: number
}

const ProductTable = ({ limit, page }: Props) => {
  const { setLoadingState } = useLoadingState()
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: page,
    pageSize: limit,
  });
  const { products, count, isLoading } = useProducts({ limit: pageSize, page: pageIndex })

  useEffect(() => {
    setLoadingState(isLoading)
  }, [isLoading, setLoadingState])

  return (
    <div>
      <DataTable columns={columns} data={products || []} pageIndex={pageIndex} pageSize={pageSize} setPagination={setPagination} count={count || 0} />
    </div>
  )
}

export default ProductTable