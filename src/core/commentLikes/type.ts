import { User } from '../users/types'

export type CommentLikes = {
  id: string
  //Relations
  comment: Comment
  commentId: string
  user: User
  userId: string
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}