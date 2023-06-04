import HeroBanner from '@/components/HeroBanner'
//import ProductCard, { Product } from '@/components/ProductCard'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import Wrapper from '@/components/Wrapper'
import products from '@/data/products.json'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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

// export async function getStaticProps() {
//   // const products = await fetchDataFromApi('/api/products?populate=*')

//   return {
//     props: { products }
//   }
// }
