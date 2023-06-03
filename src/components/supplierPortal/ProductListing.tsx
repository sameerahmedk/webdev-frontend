import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ProductListing = () => {
  // Mock data for product listings
  const productData = [
    { id: 1, name: 'Product 1', quantity: 10, price: 20 },
    { id: 2, name: 'Product 2', quantity: 5, price: 15 },
    { id: 3, name: 'Product 3', quantity: 8, price: 25 }
    // Add more products if needed
  ]

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Product Listing
      </Typography>
      <Typography paragraph>
        <div>
          <div className="flex justify-end mb-4 pl-20">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Add Product
            </button>
          </div>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">Name</th>
                <th className="border-b px-4 py-2">Quantity</th>
                <th className="border-b px-4 py-2">Price</th>
                {/* Add more table headers for additional fields */}
              </tr>
            </thead>
            <tbody>
              {productData.map(product => (
                <tr key={product.id}>
                  <td className="border-b px-4 py-2">{product.name}</td>
                  <td className="border-b px-4 py-2">{product.quantity}</td>
                  <td className="border-b px-4 py-2">{product.price}</td>
                  {/* Add more table cells for additional fields */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Typography>
    </Box>
  )
}

export default ProductListing
