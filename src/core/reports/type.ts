import { Comment } from '../comments/type'
import { User } from '../users/types'

export type Report = {
  id: string
  message: string
  status: boolean
  //Relations
  reportType: ReportType
  reportTypeId: string
  user: User
  userId: string
  comment: Comment
  commentId: string
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}
