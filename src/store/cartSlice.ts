import { Product } from '@/types/product'
import { getDiscountedPricePercentage } from '@/utils/discountPercentage'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface CartItem {
  id: string
  name: string
  discountedPrice: number
  attributes: {
    image: string
    unitPrice: number
    [key: string]: any
  }
  quantity: number
}

export interface CartState {
  cartItems: CartItem[]
}

const initialState: CartState = {
  cartItems: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const {
        id,
        name,
        discountedPrice,
        quantity,
        attributes: { image, unitPrice }
      } = action.payload
      const existingItem = state.cartItems.find(p => p.id === id)

      if (existingItem) {
        // Item already exists in the cart, update the quantity
        const updatedQuantity: number = existingItem.quantity + quantity
        // const updatedDiscountedPrice = calculateDiscountedPrice(existingItem)

        state.cartItems = state.cartItems.map(p => {
          if (p.id === id) {
            return {
              ...p,
              quantity: updatedQuantity,
              price: discountedPrice || unitPrice
            }
          }
          return p
        })
      } else {
        // Add a new item to the cart
        const newItem: CartItem = {
          id: id,
          name,
          discountedPrice: discountedPrice || unitPrice,
          attributes: {
            image,
            unitPrice: unitPrice
          },
          quantity: quantity
        }
        state.cartItems.push(newItem)
      }
    },

    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.cartItems = state.cartItems.filter(p => p.id !== action.payload.id)
    }
  }
})

function calculateDiscountedPrice(
  { attributes: { unitPrice }, quantity },
  discount: Product['discount']
): number {
  const discountPercentage = getDiscountedPricePercentage(quantity, discount)
  const discountedPrice = unitPrice * (1 - discountPercentage / 100)

  return discountedPrice
}

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
