type Store = {
  id: string
  name: string
  logoImage: string
  //Relations
  products: Product[]
  banners: Banner[]
  coupons: Coupon[]
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}