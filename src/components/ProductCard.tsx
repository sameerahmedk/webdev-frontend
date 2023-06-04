import Image from 'next/image'
import Link from 'next/link'
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
      quantity: number
      percentage: number
      _id: string
    }[]
    image: string
  }
}

const ProductCard = ({ data: p }: ProductCardProps) => {
  const hasDiscount = p.discount && p.discount.length > 0

  return (
    <Link href={`/product/${p._id}`} passHref>
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow">
        <div className="w-full h-40 relative overflow-hidden">
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover'
            }}
          />
        </div>
        <div className="mt-4">
          <h2 className="text-base md:text-lg font-semibold text-gray-800">
            {p.name}
          </h2>
          {/* <p className="text-sm md:text-base font-medium text-gray-500 mt-2">{p.description}</p> */}
          <div className="mt-2 flex justify-between items-center">
            <p className="text-base md:text-lg font-medium text-gray-800">
              {p.unitPrice}$
            </p>
            {hasDiscount && (
              <div className="text-sm text-green-500 font-medium">
                {p.discount!.map(d => (
                  <div key={d._id}>
                    {d.quantity}+ items - {d.percentage}% off
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
