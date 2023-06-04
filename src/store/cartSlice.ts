import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface CartItem {
  id: string
  name: string
  unitPrice: number
  attributes: {
    image: string
    price: number
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
      const item = state.cartItems.find(p => p.id === action.payload.id)
      if (item) {
        item.quantity++
        item.attributes.price = item.unitPrice * item.quantity
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 })
      }
    },
    updateCart: (
      state,
      action: PayloadAction<{ key: string; val: any; id: string }>
    ) => {
      state.cartItems = state.cartItems.map(p => {
        if (p.id === action.payload.id) {
          if (action.payload.key === 'quantity') {
            p.attributes.price = p.unitPrice * action.payload.val
          }
          return { ...p, [action.payload.key]: action.payload.val }
        }
        return p
      })
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.cartItems = state.cartItems.filter(p => p.id !== action.payload.id)
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
