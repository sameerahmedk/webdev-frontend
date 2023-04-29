import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import Wrapper from "@/components/Wrapper";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import { fetchDataFromApi } from "@/utils/api";
import products from "@/data/products.json";
import { getDiscountedPricePercentage } from "@/utils/discountPercentage";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";
//import { addToCart } from "@/store/cartSlice";

import { addToCart } from "../../../store/cartSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const ProductDetails = ({ product, products }) => {
    //const [selectedSize, setSelectedSize] = useState();
    const [showError, setShowError] = useState(false);

    //const dispatch = useDispatch();
    const p = product;
    //const prod=productsData;
    //console.log(products);

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
      const newQuantity = parseInt(event.target.value, 10);
      if (!isNaN(newQuantity)) {
        setQuantity(newQuantity);
      }
    };

    
  const handleIncreaseClick = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseClick = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };
    const notify = () => {
        toast.success("Success. Check your cart!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    return (
        <div className="w-full md:py-20">
            <ToastContainer />
            <Wrapper>
                <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                    {/* left column start */}
                    <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                        <ProductDetailsCarousel images={p.image} />
                    </div>
                    {/* left column end */}

                    {/* right column start */}
                    <div className="flex-[1] py-3">
                        {/* PRODUCT TITLE */}
                        <div className="text-[34px] font-semibold mb-2 leading-tight">
                            {p.name}
                        </div>

                        {/* PRODUCT SUBTITLE
                        <div className="text-lg font-semibold mb-5">
                            {p.subtitle}
                        </div> */}

                        {/* PRODUCT PRICE */}
                        <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">
                                ${p.unitPrice}
                            </p>
                            {p.unitPrice && (
                                <>
                                    <p className="text-base  font-medium line-through">
                                        ${p.unitPrice}
                                    </p>
                                    <p className="ml-auto text-base font-medium text-green-500">
                                        {getDiscountedPricePercentage(
                                            p.unitPrice,
                                            p.discount
                                        )}
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

                        {/* PRODUCT SIZE RANGE START */}
                        {/* <div className="mb-10"> */}
                            {/* HEADING START */}
                            {/* <div className="flex justify-between mb-2">
                                <div className="text-md font-semibold">
                                    Select Size
                                </div>
                                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                                    Select Guide
                                </div>
                            </div> */}
                            {/* HEADING END */}

                            {/* SIZE START */}
                            {/* <div
                                id="sizesGrid"
                                className="grid grid-cols-3 gap-2"
                            >
                                {p.size.data.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`border rounded-md text-center py-3 font-medium ${
                                            item.enabled
                                                ? "hover:border-black cursor-pointer"
                                                : "cursor-not-allowed bg-black/[0.1] opacity-50"
                                        } ${
                                            selectedSize === item.size
                                                ? "border-black"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            setSelectedSize(item.size);
                                            setShowError(false);
                                        }}
                                    >
                                        {item.size}
                                    </div>
                                ))}
                            </div> */}
                            {/* SIZE END */}

                            {/* SHOW ERROR START */}
                            {/* {showError && (
                                <div className="text-red-600 mt-1">
                                    Size selection is required
                                </div>
                            )} */}
                            {/* SHOW ERROR END */}
                        {/* </div> */}
                        {/* PRODUCT SIZE RANGE END */}

                        {/* Product Quantity button */}
                     <div className="flex items-center mb-4">
                        <span className="mr-4">Quantity:</span>
                        <div className="flex items-center">
                            <button
                            className="px-2 py-1 bg-gray-200 border rounded-l"
                            onClick={handleDecreaseClick}
                            >
                            -
                            </button>
                            <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="px-2 py-1 border text-center"
                            />
                            <button
                            className="px-2 py-1 bg-gray-200 border rounded-r"
                            onClick={handleIncreaseClick}
                            >
                            +
                            </button>
                        </div>
                        </div>
                        {/* ADD TO CART BUTTON START */}
                        <button
                            className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                            onClick={
                                () => {
                                // if (!selectedSize) {
                                //     setShowError(true);
                                //     document
                                //         .getElementById("sizesGrid")
                                //         .scrollIntoView({
                                //             block: "center",
                                //             behavior: "smooth",
                                //         });
                                // } else {
                                //     dispatch(
                                //         addToCart({
                                //             ...product?.data?.[0],
                                //             selectedSize,
                                //             oneQuantityPrice: p.price,
                                //         })
                                //     );
                                //     notify();
                                // }
                            }
                        }
                        >
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
                            <div className="text-lg font-bold mb-5">
                                Product Details
                            </div>
                            <div className="markdown text-md mb-5">
                                <ReactMarkdown>{p.description}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                    {/* right column end */}
                </div>

                <RelatedProducts products={products} product_uid={product._id} />
            </Wrapper>
        </div>
    );
};

export default ProductDetails;

// export async function getStaticPaths() {
//     const products = await fetchDataFromApi("/api/products?populate=*");
//     const paths = products?.data?.map((p) => ({
//         params: {
//             slug: p.attributes.slug,
//         },
//     }));

//     return {
//         paths,
//         fallback: false,
//     };
// }

// export async function getStaticProps({ params: { slug } }) {
//     const product = await fetchDataFromApi(
//         `/api/products?populate=*&filters[slug][$eq]=${slug}`
//     );
//     const products = await fetchDataFromApi(
//         `/api/products?populate=*&[filters][slug][$ne]=${slug}`
//     );

//     return {
//         props: {
//             product,
//             products,
//         },
//     };
// }


import fs from 'fs';
import path from 'path';
import { useRouter } from 'next/router';

// import React from "react";
import Image from "next/image";

// const ProductPage = ({ product }) => {
//     return (
//       <div className="container mx-auto py-10">
//         <div className="grid grid-cols-2 gap-4">
//           <div className="w-full">
//             <div className="relative h-96">
//                 <Image
//     src={product.image}
//     alt={product.name}
//     width={500}
//     height={500}
//     objectFit="cover"
//         objectPosition="center"
//               />
//             </div>
//           </div>
//           <div className="w-full">
//             <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
//             <p className="mb-4">{product.description}</p>
//             <div className="flex mb-4">
//               <span className="font-bold">Brand:</span>
//               <span className="ml-2">{product.brand}</span>
//             </div>
//             <div className="flex mb-4">
//               <span className="font-bold">Category:</span>
//               <span className="ml-2">{product.category}</span>
//             </div>
//             <div className="flex mb-4">
//               <span className="font-bold">Unit Price:</span>
//               <span className="ml-2">${product.unitPrice}</span>
//             </div>
//             <div className="flex mb-4">
//               <span className="font-bold">Quantity:</span>
//               <span className="ml-2">{product.quantity}</span>
//             </div>
//             {product.discount && (
//               <div className="flex mb-4">
//                 <span className="font-bold">Discount:</span>
//                 <span className="ml-2">
//                   {product.discount.map((discount) => (
//                     <div key={discount._id}>
//                       <span>{discount.quantity}+</span>
//                       <span className="ml-1">{discount.percentage}% off</span>
//                     </div>
//                   ))}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default ProductPage;
// import { useState } from "react";
// import Image from "next/image";

// const ProductDetailsPage = ({ product }) => {
//   const [quantity, setQuantity] = useState(1);

//   const handleQuantityChange = (e) => {
//     setQuantity(e.target.value);
//   };

//   const handleAddToCart = () => {
//     // TODO: Add the product to the cart with the selected quantity
//   };

//   return (
// //     <div className="container">
// //       <div className="row">
// //         <div className="col-lg-6">
// //           <Image
// //             src={product.image}
// //             alt={product.name}
// //             width={800}
// //             height={600}
// //             objectFit="contain"
// //           />
// //         </div>
// //         <div className="col-lg-6">
// //           <h1>{product.name}</h1>
// //           <h3>{product.description}</h3>
// //           <p>Price: ${product.unitPrice.toFixed(2)}</p>
// //           <div className="form-group">
// //             <label htmlFor="quantity">Quantity:</label>
// //             <input
// //               type="number"
// //               id="quantity"
// //               className="form-control"
// //               min="1"
// //               max={product.quantity}
// //               value={quantity}
// //               onChange={handleQuantityChange}
// //             />
// //           </div>
// //           <button className="btn btn-primary" onClick={handleAddToCart}>
// //             Add to Cart
// //           </button>
// //         </div>
// //       </div>
// //       {/* <div className="row">
// //         <div className="col-lg-12">
// //           <h2>Key Features:</h2>
// //           <ul>
// //             {product.features.map((feature) => (
// //               <li key={feature}>{feature}</li>
// //             ))}
// //           </ul>
// //         </div>
// //       </div> */}
// //     </div>
// //   );

// };

// export default ProductDetailsPage;


export async function getStaticPaths() {
  const productsFilePath = path.join(process.cwd(),'src', 'data', 'products.json');
  const productsData = fs.readFileSync(productsFilePath);
  const products = JSON.parse(productsData);

  // Generate a list of all product slugs to pre-render
  const paths = products.map((product) => ({
    params: { slug: product._id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const productsFilePath = path.join(process.cwd(), 'src','data', 'products.json');
  const productsData = fs.readFileSync(productsFilePath);
  const products = JSON.parse(productsData);
  //console.log(products);
  // Fetch the product data based on the slug parameter
  const product = products.find((product) => product._id === params.slug);

//   console.log(product);

  return {
    props: {
        product:product,
        products:products
    },
  };
}
