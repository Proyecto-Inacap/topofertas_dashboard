type HistoricalPrice = {
  id: string
  price: number
  //Relations
  product: Product
  productId: string
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}