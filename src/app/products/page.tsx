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
  const pageValue = Number((page) || 0) - 1

  if (!limits.includes(limitValue)) {
    redirect(`/products?limit=10${page ? `&page=${Number(page)}` : ''}`)
  }

  return (
    <ProductTable limit={limitValue} page={pageValue} />
  )
}

export default ProductsPage