import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

const ProductDetailsCarousel = ({ images: image }) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        thumbWidth={60}
        className="productCarousel">
        <Image
          src={image}
          alt="product image"
          width={1080}
          height={1920}
        />
      </Carousel>
    </div>
  )
}

export default ProductDetailsCarousel
