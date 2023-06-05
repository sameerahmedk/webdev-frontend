import React, { useEffect, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import Cookies from 'js-cookie'
// import orders from '@/data/orders.json'

const OrderTable = () => {
  const [orders, setOrders] = useState([])
  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  const authToken = Cookies.get('AuthToken')
  const userId = Cookies.get('UserId')
  const userRole = Cookies.get('Role')

  useEffect(() => {
    // Fetch orders from API
    fetch('http://localhost:8080/order/', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODU4NDczNDEsImV4cCI6MTY4NjIwNzM0MSwiYXVkIjoiNjQ0Njc0ODU1MDllYWIwN2FhM2IwZTJkIiwiaXNzIjoiZGFzdGd5ci5jb20ifQ.m5wnfabrgAFX6IeA6yCDnIMZPuZMn7Og4_uRfulPwvY',
        userId: userId,
        Role: userRole
      }
    })
      .then(response => response.json())
      .then(data => setOrders(data.supplierOrders))
      .catch(error => console.log(error))
  }, [])

  // Update order status functionality

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex justify-end mb-4">
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-4">
          Update Status
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Save
        </button>
      </div>
      <div className="overflow-x-auto">
        <table
          className={`w-full ${
            isLargeScreen ? 'min-w-650' : 'min-w-0'
          } bg-white border border-gray-200 rounded shadow-sm`}>
          <thead className="bg-gray-100">
            <tr>
              {' '}
              <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
                Order ID
              </th>
              <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
                Retailer
              </th>
              <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
                Supplier
              </th>
              <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
                Products
              </th>
              <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
                Total Price
              </th>
              <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
                Order Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr>
                <td className="py-4 px-6 border-b">{order._id}</td>
                <td className="py-4 px-6 border-b">{order.retailerId}</td>
                <td className="py-4 px-6 border-b text-left">
                  {order.supplierId}
                </td>
                <td className="py-4 px-6 border-b text-left">
                  {order.products.map(product => (
                    <div key={product.productId}>
                      Product ID: {product.productId}, Price:{' '}
                      {product.productPrice}, Quantity:{' '}
                      {product.productQuantity}
                    </div>
                  ))}
                </td>
                <td className="py-4 px-6 border-b text-left">
                  {order.totalPrice}$
                </td>
                <td className="py-4 px-6 border-b text-left">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderTable
