import Header from '@/components/Header'
import HeroBanner from '@/components/HeroBanner'
import ProductCard from '@/components/ProductCard'
import Wrapper from '@/components/Wrapper'
import axios from 'axios'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

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
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI2NDQ2NzQ4NTUwOWVhYjA3YWEzYjBlMmQiLCJ1c2VyUm9sZSI6InN1cHBsaWVyIiwiaWF0IjoxNjg1OTczMjQ5LCJleHAiOjE2ODY1NzgwNDksImlzcyI6ImRhc3RneXIuY29tIn0.AIBD9z2YwOIGLgMRHFA-6C_enb4barAb3Mj1JjNtKjs' // Replace with your access token
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
              Get all your business needs in one place with the best prices.
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
      </main>
    </>
  )
}

// export async function getServerSideProps() {
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/', {
//         params: {
//           filter: {}, // Add your filter object here if needed
//           limit: 10 // Specify the limit for the number of products
//         },
//         headers: {
//           Authorization: process.env.token // Replace with your access token
//         }
//       })

//       return response.data
//     } catch (error) {
//       console.error('Error fetching products:', error.message)
//     }
//   }
//   const products = await fetchProducts()

//   return {
//     props: { products }
//   }
// }
