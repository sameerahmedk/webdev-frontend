import React, { useEffect, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import Cookies from 'js-cookie'

const ProductTable = () => {
  const [products, setProducts] = useState([])
  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  const authToken = Cookies.get('AccessToken')

  useEffect(() => {
    // Fetch products from API
    fetch('http://localhost:8080/product/', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error))
  }, [])

  const handleDeleteProduct = productId => {
    // Send DELETE request to API to delete the product
    fetch(`http://localhost:8080/product/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(() => {
        // Remove the deleted product from the products list
        setProducts(prevProducts =>
          prevProducts.filter(product => product._id !== productId)
        )
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <table
        className={`w-full ${
          isLargeScreen ? 'min-w-650' : 'min-w-0'
        } bg-white border border-gray-200 rounded shadow-sm`}>
        {/* Table header */}
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b font-medium text-gray-700">
              Name
            </th>
            {/* <th className="py-3 px-4 border-b font-medium text-gray-700 text-right">
              Quantity
            </th> */}
            <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
              Price
            </th>
            <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
              Category
            </th>
            <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
              Brand
            </th>
            <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
              Variations
            </th>
            <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
              Discount
            </th>

            <th className="py-3 px-4 border-b font-medium text-gray-700 text-centre">
              Actions
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td className="py-4 px-6 border-b">{product.name}</td>
              {/* <td className="py-4 px-6 border-b text-right">
                {product.quantity}
              </td> */}
              <td className="py-4 px-6 border-b text-left">
                {product.unitPrice}
              </td>
              <td className="py-4 px-6 border-b text-left">
                {product.category}
              </td>
              <td className="py-4 px-6 border-b text-left">{product.brand}</td>
              <td className="py-4 px-6 border-b text-left ">
                {/* {product.variations.map(variation => (
                  <div key={variation._id}> */}
                {product.variations.map(option => (
                  <div key={option._id} style={{ marginBottom: '15px' }}>
                    <p>{option.option}</p>
                    <p>Qty: {option.quantity}</p>
                  </div>
                ))}
                {/* </div>
                ))} */}
              </td>
              <td className="py-4 px-6 border-b text-left">
                {product.discount.map(discount => (
                  <div key={discount._id} style={{ marginBottom: '15px' }}>
                    Quantity: {discount.quantity}, Discount:{' '}
                    {discount.percentage}%
                  </div>
                ))}
              </td>
              <td className="py-4 px-6 border-b text-left">
                <button
                  type="button"
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
