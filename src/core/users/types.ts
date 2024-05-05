import { Favorite } from '../favorites/type'
import { Rating } from '../ratings/type'
import { UserRole } from "../userRoles/types"

export type User = {
  id: string
  username: string
  gender: string
  email: string
  password: string
  status: boolean
  //Relations
  userRole: UserRole
  userRoleId: string
  favorites: Favorite[]
  ratings: Rating[]
  reports: Report[]
  comments: Comment[]
  // commentLikes: CommentLike[]
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}


export type UserNextAuth = {
  id: string
  username: string
  gender: string
  password: string
  //Relations
  userRole: UserRole
  // favorites: Favorite[]
  // ratings: Rating[]
  reports: Report[]
  comments: Comment[]
  // commentLikes: CommentLike[]
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}

