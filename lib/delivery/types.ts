export type ProductAccessLink = {
  label: string
  url: string
}

export type SessionProductLine = {
  id: string
  name: string
  quantity: number
}

export type DeliveryItem = {
  productId: string
  name: string
  label: string
  downloadUrl: string
}

export type DeliveryTokenPayload = {
  sid: string
  pid: string
  exp: number
}
