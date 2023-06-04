import React from 'react'
// import ProductTable from '../components/ProductTable';
// import ProductTable from '../../components/supplierPortal/supplierProductTable'
import Header from '@/components/supplierPortal/supplierPortalHeader'
import { AiOutlinePlus } from 'react-icons/ai'

import { useEffect, useState } from 'react'
import OrderTable from '@/components/supplierPortal/supplierOrderTable'

const orderTable = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Orders </h1>
          </div>
          <OrderTable />
        </div>
      </div>
    </div>
  )
}

export default orderTable
