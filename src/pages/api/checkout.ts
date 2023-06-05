import { Order } from '@/types/order'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Extract the order details from the request body
    const { products, totalPrice }: Order = req.body

    // Create a new order
    await createOrder({
      products,
      totalPrice
    })

    // Redirect the user to a success page or send a success response
    res.status(200).json({ message: 'Order placed successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred during checkout' })
  }
}

// Function to create a new order
async function createOrder(order: Order) {
  const response = await axios.post(process.env.CREATE_ORDER_API, order)
  return response.data
}
