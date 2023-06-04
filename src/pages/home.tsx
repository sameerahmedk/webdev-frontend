import HeroBanner from '@/components/HeroBanner'
//import ProductCard, { Product } from '@/components/ProductCard'
import Wrapper from '@/components/Wrapper'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import products from '@/data/products.json'
import ProductCard from '@/components/ProductCard'

// import home from '@/pages/supplierPortal/home'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

// const withAuth = WrappedComponent => {
//   const AuthComponent = props => {
//     const router = useRouter()

//     useEffect(() => {
//       const accessToken = Cookies.get('AccessToken')
//       if (!accessToken) {
//         router.push('/')
//       }
//     }, [router])

//     if (typeof window === 'undefined') {
//       // Render nothing during server-side rendering
//       return null
//     }

//     return <WrappedComponent {...props} />
//   }

//   return AuthComponent
// }

const Home = () => {
  return (
    <div>
      <main>
        <Head>
          <title>B2B Marketplace</title>
          <meta
            name="description"
            content="Building your one-stop B2B marketplace"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
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
            {/* <div>
              <Link href={`/supplierPortal/supplierTable`} passHref>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
                  Supplier Portal
                </button>
              </Link>
            </div> */}
          </div>
          {/* heading and paragaph end */}

          {/* products grid start */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
            {products?.map(product => (
              <ProductCard key={product?._id} data={product} />
            ))}
            {/* <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard /> */}
          </div>
          {/* products grid end */}
        </Wrapper>
      </main>
    </div>
  )
}

// export async function getStaticProps() {
//   // const products = await fetchDataFromApi('/api/products?populate=*')

//   return {
//     props: { products }
//   }
// }

export default Home
