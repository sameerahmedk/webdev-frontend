import { removeFromCart } from '@/store/cartSlice'
import currency from 'currency.js'
import Image from 'next/image'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'

const CartItem = ({ data: product }) => {
  const dispatch = useDispatch()

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image
          src={product.attributes.image}
          alt={product.name}
          width={120}
          height={120}
          style={{
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </div>
      {/* IMAGE END */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* PRODUCT TITLE */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {product.name}
          </div>

          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2 d:mt-0 md:ml-4 self-end">
            MRP: {currency(product.attributes.unitPrice).format()}
          </div>
        </div>
        {/* PRODUCT QUANTITY */}
        <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2 md:mt-0 md:ml-4 self-end">
          QTY: {product.quantity}
        </div>

        <RiDeleteBin6Line
          onClick={() => dispatch(removeFromCart({ id: product.id }))}
          className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
        />
      </div>
    </div>
  )
}

export default CartItem
