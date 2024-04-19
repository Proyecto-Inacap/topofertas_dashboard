type Banner = {
  id: string
  image: string
  link: string
  enabled: boolean
  //Relations
  store: Store
  storeId: string
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}
