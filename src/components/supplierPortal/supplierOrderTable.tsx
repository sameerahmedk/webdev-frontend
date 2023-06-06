import React, { useEffect, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import Cookies from 'js-cookie'
// import orders from '@/data/orders.json'

const OrderTable = () => {
  const [orders, setOrders] = useState([])
  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  const OrderStatus = ['pending', 'accepted', 'delivered', 'cancelled']
  var Status = ''
  const authToken = Cookies.get('AccessToken')
  const userId = Cookies.get('UserId')
  const userRole = Cookies.get('Role')

  useEffect(() => {
    // Fetch orders from API
    fetch('http://localhost:8080/order/', {
      headers: {
        Authorization: `Bearer ${authToken}`,
        userId: userId,
        Role: userRole
      }
    })
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.log(error))
  }, [])
  console.log(orders)
  // Update order status functionality
  const handleUpdateStatus = (orderId, newStatus) => {
    fetch('http://localhost:8080/order/updatestatus', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({
        orderId,
        status: newStatus
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message)
        // Perform any necessary operations or update the order table
      })
      .catch(error => {
        console.log('Error updating order status:', error)
      })
  }

  const handleStatusChange = newValue => {
    console.log(newValue) // Log the selected value
    // Store the selected value in a variable or use it as needed
    Status = newValue
  }

  return (
    <div className="max-w-screen-lg mx-auto">
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
                Retailer ID
              </th>
              {/* <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
                Supplier
              </th> */}
              <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
                Product ID
              </th>
              <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
                Product Price
              </th>
              <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
                Product Quantity
              </th>
              <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
                Variation
              </th>
              <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
                Total Price
              </th>
              <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
                Order Status
              </th>
              <th className="py-3 px-4 border-b font-medium text-gray-700 text-center">
                Update Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr>
                <td className="py-4 px-6 border-b">{order._id}</td>
                <td className="py-4 px-6 border-b">{order.retailerId}</td>
                <td className="py-4 px-6 border-b">{order.productId}</td>
                <td className="py-4 px-6 border-b text-left">
                  {order.productPrice}$
                </td>
                <td className="py-4 px-6 border-b text-left">
                  {order.productQuantity}
                </td>
                <td className="py-4 px-6 border-b text-left">
                  {order.selectedOptions[0]}
                </td>
                {/* <td className="py-4 px-6 border-b text-left">
                  {order.products.map(product => (
                    <div
                      key={product.productId}
                      style={{ marginBottom: '15px' }}>
                      Product ID: {product.productId}
                      <br />
                      Supplier ID: {product.supplierId}
                      <br />
                      Name: {product.productName}
                      <br />
                      Price: {product.productPrice}
                      <br />
                      Quantity: {product.productQuantity}
                      <br />
                    </div>
                  ))}
                </td> */}
                <td className="py-4 px-6 border-b text-left">
                  {order.totalPrice}$
                </td>
                {/* <td className="py-4 px-6 border-b text-left">{order.status}</td> */}

                <td className="py-4 px-6 border-b text-left">
                  {/* {order.status} */}
                  {/* <select onChange={e => handleStatusChange(e.target.value)}>
                    <option value="select">{order.status}</option>
                    <option value="pending">pending</option>
                    <option value="accepted">accepted</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </td> */}
                  {/* {order.status} */}
                  {/* <select
                    value={order.status}
                    onChange={e => handleStatusChange(e.target.value)}>
                    {Object.values(OrderStatus)
                      // .filter(status => status.localeCompare(order.status) >= 0)
                      .map(
                        status => (
                          console.log(status),
                          (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          )
                        )
                      )}
                  </select> */}

                  <select onChange={e => handleStatusChange(e.target.value)}>
                    <option>{order.status}</option>
                    <option value="pending">pending</option>
                    <option value="accepted">accepted</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </td>
                <td className="py-4 px-6 border-b text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    onClick={() => handleUpdateStatus(order._id, Status)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderTable
