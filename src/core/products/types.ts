import { Category } from '../categories/types'
import { Characteristic } from '../characteristics/types'
import { Comment } from '../comments/type'
import { Favorite } from '../favorites/type'
import { HistoricalPrice } from '../historicalPrices/type'
import { Rating } from '../ratings/type'
import { Store } from '../stores/types'

export type Product = {
  id: string
  name: string
  stock: number
  description: string
  link: string
  price: number
  offerPrice: number
  enabled: boolean
  //Relations
  category: Category
  categoryId: string
  store: Store
  storeId: string
  favorites: Favorite[]
  characteristics: Characteristic[]
  ratings: Rating[]
  comments: Comment[]
  historicalPrices: HistoricalPrice[]
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}