import React from 'react'
// import ProductTable from '../components/ProductTable';
import ProductTable from '../../components/supplierPortal/supplierProductTable'
import Header from '@/components/supplierPortal/supplierPortalHeader'
import { AiOutlinePlus } from 'react-icons/ai'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const supplierTable = () => {
  //   const [products, setProducts] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    unitPrice: 0,
    category: '',
    brand: '',
    quantity: 0,
    discounts: [{ quantity: 0, percentage: 0 }],
    variations: [{ option: '', quantity: 0 }],
    image: ''
  })

  const initialFormData = {
    name: '',
    description: '',
    unitPrice: 0,
    category: '',
    brand: '',
    quantity: 0,
    discounts: [{ quantity: 0, percentage: 0 }],
    variations: [{ option: '', quantity: 0 }],
    image: ''
  }

  const handleAddProduct = () => {
    setIsFormOpen(true)
  }

  const handleSaveProduct = () => {
    const isEmptyField = Object.values(formData).some(
      value => value === '' || value === null
    )

    if (isEmptyField) {
      alert('Please fill all fields before submitting')
    } else {
      const requestBody = {
        name: formData.name,
        description: formData.description,
        unitPrice: formData.unitPrice,
        category: formData.category,
        brand: formData.brand,
        // quantity: formData.quantity,
        variations: formData.variations,
        discount: formData.discounts,
        image: formData.image
      }

      fetch('http://localhost:8080/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI2NDQ2NzQ4NTUwOWVhYjA3YWEzYjBlMmQiLCJ1c2VyUm9sZSI6InN1cHBsaWVyIiwiaWF0IjoxNjg1OTg2Mzg5LCJleHAiOjE2ODY1OTExODksImlzcyI6ImRhc3RneXIuY29tIn0.b8H8THRWbGKmb0Ziy33tL5DPut5hlUFp4Wvxq2JLPa0'
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response or perform further actions
          console.log(data)
          // Reset the form and close the modal
          setFormData(initialFormData)
          setIsFormOpen(false)
        })
        .catch(error => {
          // Handle any errors that occurred during the request
          console.error(error)
          // Show an error message or perform further error handling
        })
    }
  }

  const handleCancel = () => {
    // Reset form fields
    setFormData(initialFormData)
    // Close the form
    setIsFormOpen(false)
  }
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleDiscountChange = (index, field, value) => {
    setFormData(prevData => {
      const discounts = [...prevData.discounts]
      discounts[index][field] = value
      return { ...prevData, discounts }
    })
  }

  const handleVariationChange = (index, field, value) => {
    setFormData(prevData => {
      const variations = [...prevData.variations]
      variations[index][field] = value
      return { ...prevData, variations }
    })
  }

  const handleAddVariationRow = () => {
    setFormData(prevData => ({
      ...prevData,
      variations: [...prevData.variations, { option: '', quantity: 0 }]
    }))
  }

  const handleAddDiscountRow = () => {
    setFormData(prevData => ({
      ...prevData,
      discounts: [...prevData.discounts, { quantity: 0, percentage: 0 }]
    }))
  }

  const handleDeleteVariationRow = index => {
    setFormData(prevData => {
      const updatedVariations = [...prevData.variations]
      updatedVariations.splice(index, 1)
      return {
        ...prevData,
        variations: updatedVariations
      }
    })
  }

  const handleDeleteDiscountRow = index => {
    setFormData(prevData => {
      const updatedDiscounts = [...prevData.discounts]
      updatedDiscounts.splice(index, 1)
      return {
        ...prevData,
        discounts: updatedDiscounts
      }
    })
  }

  return (
    <div>
      <Header />
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Product Listing</h1>
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              onClick={handleAddProduct}>
              <AiOutlinePlus className="inline-block mr-2" />
              Add Product
            </button>
          </div>
          {isFormOpen ? (
            <div className="bg-white p-8 rounded shadow">
              <h2 className="text-2xl font-bold mb-4">Add Product</h2>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-2">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-gray-700 font-bold mb-2">
                    Description:
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="unitPrice"
                    className="block text-gray-700 font-bold mb-2">
                    Unit Price:
                  </label>
                  <input
                    type="number"
                    id="unitPrice"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={handleChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-gray-700 font-bold mb-2">
                    Category:
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Select category</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Sports">Sports</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Outdoor & Camping">Outdoor & Camping</option>
                    <option value="Food">Food</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="brand"
                    className="block text-gray-700 font-bold mb-2">
                    Brand:
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="discount"
                    className="block text-gray-700 font-bold mb-2">
                    Variations:
                  </label>
                  {formData.variations.map((discount, index) => (
                    <div key={index} className="flex mb-2">
                      <div className="w-1/2">
                        <label
                          htmlFor="quantity"
                          className="block text-sm font-medium text-gray-700">
                          Quantity
                        </label>
                        <input
                          type="number"
                          id={`variation-quantity-${index}`}
                          name={`variation-quantity-${index}`}
                          value={discount.quantity}
                          onChange={e =>
                            handleVariationChange(
                              index,
                              'quantity',
                              e.target.value
                            )
                          }
                          className="appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                        />
                      </div>
                      <div className="w-1/2 pl-4">
                        <label
                          htmlFor="options"
                          className="block text-sm font-medium text-gray-700">
                          Options
                        </label>
                        <input
                          type="text"
                          id={`variation-option-${index}`}
                          name={`variation-option-${index}`}
                          value={discount.option}
                          onChange={e =>
                            handleVariationChange(
                              index,
                              'option',
                              e.target.value
                            )
                          }
                          className="appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteVariationRow(index)}
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded  text-sm ml-8">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddVariationRow}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    Add Variation
                  </button>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="discount"
                    className="block text-gray-700 font-bold mb-2">
                    Discounts:
                  </label>
                  {formData.discounts.map((discount, index) => (
                    <div key={index} className="flex mb-2">
                      <div className="w-1/2">
                        <label
                          htmlFor="quantity"
                          className="block text-sm font-medium text-gray-700">
                          Quantity
                        </label>
                        <input
                          type="number"
                          id={`discount-quantity-${index}`}
                          name={`discount-quantity-${index}`}
                          value={discount.quantity}
                          onChange={e =>
                            handleDiscountChange(
                              index,
                              'quantity',
                              e.target.value
                            )
                          }
                          className="appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                        />
                      </div>
                      <div className="w-1/2 pl-4">
                        <label
                          htmlFor="percentage"
                          className="block text-sm font-medium text-gray-700">
                          Percentage
                        </label>
                        <input
                          type="number"
                          id={`discount-percentage-${index}`}
                          name={`discount-percentage-${index}`}
                          value={discount.percentage}
                          onChange={e =>
                            handleDiscountChange(
                              index,
                              'percentage',
                              e.target.value
                            )
                          }
                          className="appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteDiscountRow(index)}
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded  text-sm ml-8">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddDiscountRow}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    Add Discount
                  </button>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block text-gray-700 font-bold mb-2">
                    Image:
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
                    onClick={handleSaveProduct}>
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                    onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <ProductTable />
          )}
        </div>
      </div>
    </div>
  )
}

export default supplierTable
