type Rating = {
  id: string
  numberRating: number
  //Relations
  product: Product
  productId: string
  user: User
  userId: string
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}
