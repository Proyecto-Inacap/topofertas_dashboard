import { User } from "../users/types"

export type UserRole = {
  id: string
  label: string
  type: number
  //Relations
  users: User[]
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}