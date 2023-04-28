import { getDiscountedPricePercentage } from '@/utils/discountPercentage'
import Link from 'next/link'
import React from 'react'

interface ProductCardProps {
  data: {
    _id: string
    supplier: string
    name: string
    description: string
    unitPrice: number
    category: string
    brand: string
    quantity: number
    discount: {
      quantity: number;
      percentage: number;
      _id: string;
  }[]
    image: string
  }
}

const ProductCard = ({ data: p }: ProductCardProps) => {
  return (
    <Link
      href={`/product/${p._id}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer">
      <img width={300} src={p.image} alt={p.name} />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{p.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">${p.unitPrice}</p>

       {/*    {p.unitPrice ? (
            <>
              <p className="text-base  font-medium line-through">
                ${p.unitPrice}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPricePercentage(0, p.discount)}% off
              </p>
            </>
          ) : null} */}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
