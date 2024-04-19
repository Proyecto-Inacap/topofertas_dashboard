type ReportType = {
  id: string
  type: string
  //Relations
  reports: Report[]
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}