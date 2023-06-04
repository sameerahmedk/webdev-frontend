import CartItem from '@/components/CartItem'
import Wrapper from '@/components/Wrapper'
import { RootState } from '@/store/store'
import currency from 'currency.js'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
  const [loading, setLoading] = useState(false)
  const { cartItems } = useSelector((state: RootState) => state.cart)

  const discountedSubtotal = useMemo(() => {
    return currency(
      cartItems.reduce(
        (total, val) => total + val.discountedPrice * val.quantity,
        0
      ),
      { increment: 1 }
    ).format()
  }, [cartItems])

  const total = useMemo(() => {
    return currency(
      cartItems.reduce(
        (total, val) => total + val.attributes.unitPrice * val.quantity,
        0
      ),
      { increment: 1 }
    ).format()
  }, [cartItems])

  const discount = useMemo(() => {
    return currency(total).subtract(discountedSubtotal).format()
  }, [total, discountedSubtotal])

  //   const discountPercentage = useMemo(() => {})

  const handlePayment = async () => {
    /*  try {
            setLoading(true);
            const stripe = await stripePromise;
            const res = await makePaymentRequest("/api/orders", {
                products: cartItems,
            });
            await stripe.redirectToCheckout({
                sessionId: res.stripeSession.id,
            });
        } catch (error) {
            setLoading(false);
            console.log(error);
        } */
    return
  }

  return (
    <div className="w-full md:py-20">
      <Wrapper className="">
        {cartItems.length > 0 && (
          <>
            {/* HEADING AND PARAGRAPH START */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Shopping Cart
              </div>
            </div>
            {/* HEADING AND PARAGRAPH END */}

            {/* CART CONTENT START */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* CART ITEMS START */}
              <div className="flex-[2]">
                <div className="text-lg font-bold">Cart Items</div>
                {cartItems.map(item => (
                  <CartItem key={item.id} data={item} />
                ))}
              </div>
              {/* CART ITEMS END */}

              {/* SUMMARY START */}
              <div className="flex flex-col flex-1">
                <div className="text-lg font-bold">Summary</div>
                <div className="p-5 my-5 bg-gray-100 rounded-xl">
                  <div className="flex justify-between mb-4">
                    <div className="text-md font-medium">MRP</div>
                    <div className="text-md font-medium">
                      {currency(discount).value === 0 ? (
                        `$${total}`
                      ) : (
                        <s>{total}</s>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between mb-4">
                    <div className="text-md font-medium">Discount</div>
                    <div
                      className={`${
                        currency(discount).value > 0
                          ? 'text-green-500'
                          : 'text-gray-500'
                      } text-md font-medium`}>
                      -{currency(discount).format()}
                    </div>
                  </div>

                  <div className="flex justify-between mb-4">
                    <div className="text-md font-medium">Subtotal</div>
                    <div className="text-md font-medium">
                      {discountedSubtotal}
                    </div>
                  </div>
                  <div className="text-sm py-5 border-t mt-5">
                    The subtotal reflects the total price of your order,
                    including duties, taxes, and applicable discounts.
                  </div>
                </div>

                {/* BUTTON START */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                  onClick={handlePayment}>
                  Checkout
                  {loading && <img src="/spinner.svg" alt="loading" />}
                </button>
                {/* BUTTON END */}
              </div>
              {/* SUMMARY END */}
            </div>
            {/* CART CONTENT END */}
          </>
        )}

        {/* This is empty screen */}
        {cartItems.length < 1 && (
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            <Image
              src="/empty-cart.jpg"
              width={300}
              height={300}
              className="w-[300px] md:w-[400px]"
              alt="Empty Cart"
            />
            <span className="text-xl font-bold">Your cart is empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything in your cart.
              <br />
              Go ahead and explore top categories.
            </span>
            <Link
              href="/"
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8">
              Continue Shopping
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  )
}

export default Cart
