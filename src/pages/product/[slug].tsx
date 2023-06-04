import Header from '@/components/Header'
import ProductDetailsCarousel from '@/components/ProductDetailsCarousel'
import RelatedProducts from '@/components/RelatedProducts'
import Wrapper from '@/components/Wrapper'
import { CartItem, addToCart } from '@/store/cartSlice'
import { RootState } from '@/store/store'
import { Product, Products } from '@/types/product'
import { getDiscountedPricePercentage } from '@/utils/discountPercentage'
import { useMemo, useState } from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'
import ReactMarkdown from 'react-markdown'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductDetails = ({
  product,
  products
}: {
  product: Product
  products: Products
}): JSX.Element => {
  const [showError, setShowError] = useState(false)

  const dispatch = useDispatch()
  const cartSelector = (state: RootState) => state.cart.cartItems
  const cart: CartItem = useSelector(cartSelector, shallowEqual)

  const [quantity, setQuantity] = useState(1)

  const calculateDiscountedPrice = (
    quantity: number,
    product: Product
  ): number => {
    const { unitPrice, discount } = product
    const discountPercentage = getDiscountedPricePercentage(quantity, discount)

    const discountedPrice = unitPrice - (unitPrice * discountPercentage) / 100
    return discountedPrice
  }

  const discountedPrice = useMemo(
    () => calculateDiscountedPrice(quantity, product),
    [quantity, product]
  )

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
        discountedPrice: discountedPrice || product.unitPrice,
        id: product._id,
        attributes: {
          image: product.image,
          unitPrice: product.unitPrice
        }
      })
    )
    toast.success('Added to cart!', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'light'
    })
  }

  const handleQuantityChange = event => {
    const newQuantity = parseInt(event.target.value, 10)
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity)
    }
  }

  const handleIncreaseClick = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  }

  const handleDecreaseClick = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1))
  }

  return (
    <>
      <Header />
      <div className="w-full md:py-20">
        <ToastContainer />
        <Wrapper className="">
          <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
            {/* left column start */}
            <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
              <ProductDetailsCarousel images={product.image} />
            </div>
            {/* left column end */}

            {/* right column start */}
            <div className="flex-[1] py-3">
              {/* PRODUCT TITLE */}
              <div className="text-[34px] font-semibold mb-2 leading-tight">
                {product.name}
              </div>

              {/* PRODUCT SUBTITLE
                        <div className="text-lg font-semibold mb-5">
                            {p.subtitle}
                        </div> */}

              {/* PRODUCT PRICE */}
              <div className="flex items-center">
                <p className="mr-2 text-lg font-semibold">${discountedPrice}</p>
                {product.unitPrice && (
                  <>
                    <p className="text-base  font-medium line-through">
                      ${product.unitPrice}
                    </p>
                    <p className="ml-auto text-base font-medium text-green-500">
                      {getDiscountedPricePercentage(quantity, product.discount)}
                      % off
                    </p>
                  </>
                )}
              </div>

              <div className="text-md font-medium text-black/[0.5]">
                incl. of taxes
              </div>
              <div className="text-md font-medium text-black/[0.5] mb-20">
                {`(Also includes all applicable duties)`}
              </div>

              {/* Product Quantity button */}
              <div className="flex items-center mb-4">
                <span className="mr-4">Quantity:</span>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="px-2 py-1 bg-gray-200 border rounded-l"
                    onClick={handleDecreaseClick}>
                    -
                  </button>
                  <input
                    aria-label="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="px-2 py-1 border text-center"
                  />
                  <button
                    type="button"
                    className="px-2 py-1 bg-gray-200 border rounded-r"
                    onClick={handleIncreaseClick}>
                    +
                  </button>
                </div>
              </div>
              {/* ADD TO CART BUTTON START */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                onClick={() => {
                  handleAddToCart()
                }}>
                Add to Cart
              </button>
              {/* ADD TO CART BUTTON END */}

              {/* WHISHLIST BUTTON START */}
              <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                Whishlist
                <IoMdHeartEmpty size={20} />
              </button>
              {/* WHISHLIST BUTTON END */}

              <div>
                <div className="text-lg font-bold mb-5">Product Details</div>
                <div className="markdown text-md mb-5">
                  <ReactMarkdown>{product.description}</ReactMarkdown>
                </div>
              </div>
            </div>
            {/* right column end */}
          </div>

          <RelatedProducts products={products} product_uid={product._id} />
        </Wrapper>
      </div>
    </>
  )
}

export default ProductDetails

import fs from 'fs'
import path from 'path'

export async function getStaticPaths() {
  const productsFilePath = path.join(
    process.cwd(),
    'src',
    'data',
    'products.json'
  )
  const productsData = fs.readFileSync(productsFilePath).toString()
  const products = JSON.parse(productsData)

  // Generate a list of all product slugs to pre-render
  const paths = products.map(product => ({
    params: { slug: product._id }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const productsFilePath = path.join(
    process.cwd(),
    'src',
    'data',
    'products.json'
  )
  const productsData = fs.readFileSync(productsFilePath).toString()
  const products = JSON.parse(productsData)
  const product = products.find(product => product._id === params.slug)

  return {
    props: {
      product: product,
      products: products
    }
  }
}
