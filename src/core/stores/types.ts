type Store = {
  id: string
  name: string
  logoImage: string
  enabled: boolean
  //Relations
  products: Product[]
  banners: Banner[]
  coupons: Coupon[]
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}