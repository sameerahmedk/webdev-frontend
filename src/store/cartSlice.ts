import { Product } from '@/types/product'
import { getDiscountedPricePercentage } from '@/utils/discountPercentage'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface CartItem extends Product {
  id: string
  name: string
  discountedPrice: number
  attributes: {
    image: string
    unitPrice: number
    [key: string]: any
  }
  quantity: number
  selectedOptions: {
    option: string
  }
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
      const { _id: id } = action.payload
      const existingItem = state.cartItems.find(p => p._id === id)

      if (existingItem) {
        // Item already exists in the cart, update the quantity
        const updatedQuantity: number =
          existingItem.quantity + action.payload.quantity

        state.cartItems = state.cartItems.map(p => {
          if (p._id === id) {
            return {
              ...p,
              quantity: updatedQuantity,
              unitPrice: calculateDiscountedPrice(p, updatedQuantity)
            }
          }
          return p
        })
      } else {
        // Add a new item to the cart
        state.cartItems.push({
          ...action.payload,
          unitPrice: calculateDiscountedPrice(
            action.payload,
            action.payload.quantity
          )
        })
      }
    },

    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.cartItems = state.cartItems.filter(p => p._id !== action.payload.id)
    },

    clearCart: state => {
      state.cartItems = []
    }
  }
})

function calculateDiscountedPrice(item: CartItem, quantity: number): number {
  const { unitPrice, discount } = item

  const discountPercentage = getDiscountedPricePercentage(quantity, discount)
  const discountedPrice = unitPrice * (1 - discountPercentage / 100)

  return discountedPrice
}

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
