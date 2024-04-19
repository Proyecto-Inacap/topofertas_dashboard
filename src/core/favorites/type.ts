type Favorite = {
  id: string
  receiveNotifications: boolean
  //Relations
  user: User
  userId: String
  product: Product
  productId: String
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}
