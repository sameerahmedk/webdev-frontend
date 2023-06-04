type Discount = {
  quantity: number
  percentage: number
  _id: string
}

type VariationOption = {
  option: string
  quantity: number
}

type Variations = {
  options: VariationOption[]
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
  discount: Discount[]
  variations: Variations[]
  image: string
  __v: number
}

export type Products = Product[]
