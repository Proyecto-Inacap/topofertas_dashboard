import { Product } from '../products/types'

export type Category = {
  id: string
  name: string
  //Relations
  products: Product[]
  //Default timestamps
  createdAt: Date
  updatedAt: Date
  enabled: boolean
}