type User = {
  id: string
  username: string
  gender: string
  email: string
  password: string
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


