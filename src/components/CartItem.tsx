import {
  CartItem as typeCartItem,
  addToCart,
  removeFromCart
} from '@/store/cartSlice'
import Image from 'next/image'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { Product } from '@/types/product'

const CartItem = ({ data }) => {
  const product: Product = data.attributes

  const dispatch = useDispatch()

  const updateCartItem = (e, key) => {
    let payload: typeCartItem = {
      ...data,
      val: key === 'quantity' ? parseInt(e.target.value) : e.target.value,
      id: data.id
    }
    dispatch(addToCart(payload))
  }

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image
          src={product.image}
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
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {product.name}
          </div>

          {/* PRODUCT SUBTITLE */}
          {/*           <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {product.subtitle}
          </div> */}

          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP : ${product.unitPrice}
          </div>
        </div>

        {/* PRODUCT SUBTITLE */}
        {/*         <div className="text-md font-medium text-black/[0.5] hidden md:block">
          {product.subtitle}
        </div> */}

        <div className="flex items-center justify-between mt-4">
          {/* <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <select
                title="Select Size"
                className="hover:text-black"
                onChange={e => updateCartItem(e, 'selectedSize')}>
                {product.size.data.map((item, i) => {
                  return (
                    <option
                      key={item.id}
                      value={item.size}
                      disabled={!item.enabled ? true : false}
                      selected={data.selectedSize === item.size}>
                      {item.size}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <select
                title="Select Quantity"
                className="hover:text-black"
                onChange={e => updateCartItem(e, 'quantity')}>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
                  return (
                    <option key={q} value={q} selected={data.quantity === q}>
                      {q}
                    </option>
                  )
                })}
              </select>
            </div>
          </div> */}
          <RiDeleteBin6Line
            onClick={() => dispatch(removeFromCart({ id: data.id }))}
            className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
          />
        </div>
      </div>
    </div>
  )
}

export default CartItem
