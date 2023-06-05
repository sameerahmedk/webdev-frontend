export interface Product {
  _id: string
  supplier: string
  name: string
  description: string
  unitPrice: number
  category: string
  brand: string
  image: string
  discount: Discount[]
  variations: Option[]
  __v: number
}

interface Discount {
  quantity: number
  percentage: number
  _id: string
}

interface Option {
  option: string
  quantity: number
  _id: string
}
