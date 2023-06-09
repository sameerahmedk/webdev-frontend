import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroBanner from '@/components/HeroBanner'
import ProductCard from '@/components/ProductCard'
import Wrapper from '@/components/Wrapper'
import axios from 'axios'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const inter = Inter({ subsets: ['latin'] })
const authToken = Cookies.get('AccessToken')
export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/product', {
          params: {
            filter: {}, // Add your filter object here if needed
            limit: 10 // Specify the limit for the number of products
          },
          headers: {
            Authorization:
            `Bearer ${authToken}`
                }
        })

        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error.message)
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      <Head>
        <title>B2B Marketplace</title>
        <meta
          name="description"
          content="Building your one-stop B2B marketplace"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <HeroBanner />
        <Wrapper className={'Wrapper'}>
          {/* heading and paragaph start */}
          <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
            <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
              Your one-stop B2B marketplace!
            </div>
            <div className="text-md md:text-xl">
              Get all your favorite shoes in one place at the best prices.
            </div>
          </div>
          {/* heading and paragaph end */}

          {/* products grid start */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
            {products?.map(product => (
              <ProductCard key={product?._id} data={product} />
            ))}
          </div>
          {/* products grid end */}
        </Wrapper>
        <Footer />
      </main>
    </>
  )
}

