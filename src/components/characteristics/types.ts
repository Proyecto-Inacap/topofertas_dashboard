type Characteristic = {
  id: string
  detalle: string
  //Relations
  product: Product
  productId: string
  characteristicType: CharacteristicType
  characteristicTypeId: string
  //Default timestamps
  createdAt: Date
  updatedAt: Date
}