// export interface OrderProduct {
//   productId: string
//   supplierId?: string
//   productPrice: number
//   productQuantity: number
//   selectedOptions: string[]
// }

// export interface Order {
//   retailerId?: string
//   status?: 'pending' | 'accepted' | 'delivered' | 'cancelled'
//   products: OrderProduct[]
//   totalPrice: number
// }

export interface Order {
  retailerId?: string
  status?: 'pending' | 'accepted' | 'delivered' | 'cancelled'
  productId: string
  productPrice: number
  productQuantity: number
  selectedOptions: {
    option: string
  }
  totalPrice: number
}
