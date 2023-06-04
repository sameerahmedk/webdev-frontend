import React, { useEffect, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

const ProductTable = () => {
  const [products, setProducts] = useState([])
  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    // Fetch products from API
    fetch('http://localhost:8080/product/', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODU4NDczNDEsImV4cCI6MTY4NjIwNzM0MSwiYXVkIjoiNjQ0Njc0ODU1MDllYWIwN2FhM2IwZTJkIiwiaXNzIjoiZGFzdGd5ci5jb20ifQ.m5wnfabrgAFX6IeA6yCDnIMZPuZMn7Og4_uRfulPwvY'
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
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODU4NDczNDEsImV4cCI6MTY4NjIwNzM0MSwiYXVkIjoiNjQ0Njc0ODU1MDllYWIwN2FhM2IwZTJkIiwiaXNzIjoiZGFzdGd5ci5jb20ifQ.m5wnfabrgAFX6IeA6yCDnIMZPuZMn7Og4_uRfulPwvY'
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
            <th className="py-3 px-4 border-b font-medium text-gray-700 text-right">
              Quantity
            </th>
            <th className="py-3 px-4 border-b font-medium text-gray-700 text-right">
              Price
            </th>
            <th className="py-3 px-4 border-b font-medium text-gray-700 text-right">
              Category
            </th>
            <th className="py-3 px-4 border-b font-medium text-gray-700 text-right">
              Brand
            </th>
            <th className="py-3 px-4 border-b font-medium text-gray-700 text-right">
              Discount
            </th>
            <th className="py-3 px-4 border-b font-medium text-gray-700 text-right">
              Actions
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td className="py-4 px-6 border-b">{product.name}</td>
              <td className="py-4 px-6 border-b text-right">
                {product.quantity}
              </td>
              <td className="py-4 px-6 border-b text-right">
                {product.unitPrice}
              </td>
              <td className="py-4 px-6 border-b text-right">
                {product.category}
              </td>
              <td className="py-4 px-6 border-b text-right">{product.brand}</td>
              <td className="py-4 px-6 border-b text-right">
                {product.discount.map(discount => (
                  <div key={discount._id}>
                    Quantity: {discount.quantity}, Percentage:{' '}
                    {discount.percentage}%
                  </div>
                ))}
              </td>
              <td className="py-4 px-6 border-b text-right">
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
