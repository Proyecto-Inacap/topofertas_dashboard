type Product = {
  id: string
  name: string
  stock: number
  description: string
  link: string
  price: number
  offerPrice: number
  enabled: Boolean
  //Relations
  // category: Category
  categoryId: string
  // store: Store
  storeId: string
  // favorites: Favorite[]
  // characteristics: Characteristic[]
  // ratings: Rating[]
  comments: Comment[]
  // historicalPrices: HistoricalPrice[]
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}