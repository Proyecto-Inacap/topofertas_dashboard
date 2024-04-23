export type Coupon =  {
  id: string
  code: string
  description: string
  enabled: boolean
  //Relations
  store: Store
  storeId: string
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}