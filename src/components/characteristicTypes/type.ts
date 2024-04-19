type CharacteristicType = {
  id: string
  type: string
  //Relations
  characteristics: Characteristic[]
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}