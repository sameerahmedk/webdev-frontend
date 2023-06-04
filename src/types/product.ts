type Discount = {
  quantity: number
  percentage: number
  _id: string
}

export type Product = {
  _id: string
  supplier: string
  name: string
  description: string
  unitPrice: number
  category: string
  brand: string
  quantity: number
  discount: Discount[]
  image: string
  __v: number
}

export type Products = Product[]
