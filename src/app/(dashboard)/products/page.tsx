import { limits } from '@/constants'
import ProductTable from '@/core/products/components/ProductTable'
import { redirect } from 'next/navigation'
import React from 'react'

interface Props {
  searchParams: {
    limit?: string
    page?: string
  }
}

const ProductsPage = ({ searchParams: { limit, page } }: Props) => {
  const limitValue = Number(limit) || 10
  const pageValue = Number(page) || 1

  if (!limits.includes(limitValue)) {
    const newParams = new URLSearchParams({ limit: '10', page: page ? page : '' })
    redirect(`/products?${newParams.toString()}`)
  }

  return (
    <ProductTable limit={limitValue} page={pageValue} />
  )
}

export default ProductsPage