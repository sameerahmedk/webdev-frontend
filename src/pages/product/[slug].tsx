import Header from '@/components/Header'
import ProductDetailsCarousel from '@/components/ProductDetailsCarousel'
import RelatedProducts from '@/components/RelatedProducts'
import Wrapper from '@/components/Wrapper'
import { addToCart } from '@/store/cartSlice'
import { Product } from '@/types/product'
import { getDiscountedPricePercentage } from '@/utils/discountPercentage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'
import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const calculateDiscountedPrice = (
  quantity: number,
  product: Product
): number => {
  const { unitPrice, discount } = product
  const discountPercentage = getDiscountedPricePercentage(quantity, discount)

  const discountedPrice = unitPrice - (unitPrice * discountPercentage) / 100
  return discountedPrice
}

const ProductDetails = (): JSX.Element => {
  const [product, setProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([]) // New state for all products
  const [showError, setShowError] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const [quantity, setQuantity] = useState(50)

  const dispatch = useDispatch()

  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/product/${slug}`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI2NDQ2NzQ4NTUwOWVhYjA3YWEzYjBlMmQiLCJ1c2VyUm9sZSI6InN1cHBsaWVyIiwiaWF0IjoxNjg1OTczMjQ5LCJleHAiOjE2ODY1NzgwNDksImlzcyI6ImRhc3RneXIuY29tIn0.AIBD9z2YwOIGLgMRHFA-6C_enb4barAb3Mj1JjNtKjs',
          }
        })
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
        setProduct(null)
      }
    }

    fetchData()
  }, [slug])

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/product', {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI2NDQ2NzQ4NTUwOWVhYjA3YWEzYjBlMmQiLCJ1c2VyUm9sZSI6InN1cHBsaWVyIiwiaWF0IjoxNjg1OTczMjQ5LCJleHAiOjE2ODY1NzgwNDksImlzcyI6ImRhc3RneXIuY29tIn0.AIBD9z2YwOIGLgMRHFA-6C_enb4barAb3Mj1JjNtKjs',
          },
        })
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
      }
    }

    fetchProducts()
  }, [])

  if (!product || !products) {
    return <div>Loading...</div>
  }

  const discountedPrice = calculateDiscountedPrice(quantity, product)

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
        discountedPrice: discountedPrice,
        id: product._id,
        selectedOptions: selectedOption.option,
        attributes: {
          image: product.image,
          unitPrice: product.unitPrice
        }
      })
    )

    toast.success('Added to cart!', {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'light'
    })
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10)
    if (!isNaN(newQuantity) && newQuantity <= selectedOption.quantity) {
      setQuantity(newQuantity)
    }
  }

  const handleIncreaseClick = () => {
    if (quantity < selectedOption.quantity) {
      setQuantity(prevQuantity => prevQuantity + 50)
    }
  }

  const handleDecreaseClick = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 50, 50))
  }

  const handleOptionClick = (option: string, quantity: number) => {
    if (quantity > 0) {
      setSelectedOption({ option, quantity })
      setQuantity(50) // Reset quantity when changing options
      setShowError(false)
    } else {
      setShowError(true)
    }
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

              {/* PRODUCT PRICE */}
              <div className="flex items-center">
                <p className="mr-2 text-lg font-semibold">${discountedPrice}</p>
                {product.unitPrice ? (
                  <>
                    <p className="text-base  font-medium line-through">
                      ${product.unitPrice}
                    </p>
                    <p className="ml-auto text-base font-medium text-green-500">
                      {getDiscountedPricePercentage(quantity, product.discount)}
                      % off
                    </p>
                  </>
                ) : null}
              </div>

              <div className="text-md font-medium text-black/[0.5]">
                incl. of taxes
              </div>
              <div className="text-md font-medium text-black/[0.5] mb-20">
                {selectedOption.quantity > 0 &&
                  `(Also includes all applicable duties)`}
              </div>

              {/* Product Variations */}
              <div className="mb-4 flex flex-wrap">
                {product.variations.length > 0 &&
                  product.variations.map(option => (
                    <div
                      key={option.option}
                      className={`flex-auto inline-block mr-2 mb-2 ${option.option === selectedOption.option
                          ? 'bg-gray-200'
                          : 'bg-gray-100'
                        }`}
                      onClick={() =>
                        handleOptionClick(option.option, option.quantity)
                      }
                      style={{ cursor: 'pointer' }}>
                      <div className="p-2 flex items-center">
                        <button
                          type="button"
                          className="px-2 py-1"
                          disabled={option.quantity <= 0}>
                          {option.option}
                        </button>
                        <p className="text-sm text-gray-500 ml-2">
                          {option.quantity} available
                        </p>
                      </div>
                    </div>
                  ))}
                {showError && (
                  <p className="text-red-500 text-sm mt-2">
                    Please select a valid option with available quantity.
                  </p>
                )}
              </div>

              {/* Product Quantity button */}
              <div className="flex items-center mb-4">
                <span className="mr-4">Quantity:</span>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="px-2 py-1 bg-gray-200 border rounded-l"
                    onClick={handleDecreaseClick}
                    disabled={quantity === 1}>
                    -
                  </button>
                  <input
                    aria-label="quantity"
                    type="number"
                    min="1"
                    max={selectedOption.quantity}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="px-2 py-1 border text-center"
                  />
                  <button
                    type="button"
                    className="px-2 py-1 bg-gray-200 border rounded-r"
                    onClick={handleIncreaseClick}
                    disabled={quantity >= selectedOption.quantity}>
                    +
                  </button>
                  <button
                    type="button"
                    className="px-2 py-1 bg-gray-200 border rounded ml-2"
                    onClick={() => setQuantity(selectedOption.quantity)}>
                    Max
                  </button>
                </div>
              </div>

              {/* ADD TO CART BUTTON START */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                onClick={handleAddToCart}
                disabled={!selectedOption}>
                Add to Cart
              </button>
              {/* ADD TO CART BUTTON END */}

              {/* WHISHLIST BUTTON START */}
              <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                Wishlist
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