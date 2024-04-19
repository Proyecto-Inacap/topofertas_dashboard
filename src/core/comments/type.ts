import { CommentLikes } from '../commentLikes/type'
import { User } from '../users/types'

export type Comment = {
  id: string
  comment: string
  //Relations
  user: User
  userId: string
  product: Product
  productId: string
  higherComment: Comment
  higherCommentId: string
  commentToComment: Comment[]
  commentLikes: CommentLikes[]
  reports: Report[]
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}