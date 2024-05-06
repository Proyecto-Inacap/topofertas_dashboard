import { Category } from '../categories/types'
import { User } from '../users/types'

export type Preference = {
  id: string
  //Relations
  user: User
  userId: String
  category: Category
  categoryId: String
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}