import { Banner } from '../banners/types'
import { Coupon } from '../coupons/types'
import { Product } from '../products/types'

export type Store = {
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