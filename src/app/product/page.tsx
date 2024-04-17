'use client'
import { useProducts } from '@/core/products/hooks/useProducts'
import React from 'react'

const ProductPage = () => {
  const { products } = useProducts()
  console.log(products)
  return (
    <div>
      {/* <DataTable columns={columns} data={data}  /> */}
    </div>
  )
}

export default ProductPage