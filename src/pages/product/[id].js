import { CartContext } from '@/src/contexts/CartContext'
import React, { useContext, useState } from 'react'

const ProductPage = ({ product }) => {
    const [expanded, setExpanded] = useState(false)
    const { addToCart } = useContext(CartContext)
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 md:py-18 py-10 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded" src={product?.image} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{product?.category.charAt(0).toUpperCase() + product?.category.slice(1)}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.title}</h1>
                        <div className="flex mb-2">
                            <span className="flex items-center py-2">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <svg key={index} fill={Math.round(product.rating.rate) > index ? "currentColor" : "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                ))}
                                <span className="text-gray-600 ml-3">{product?.rating?.count} Reviews</span>
                            </span>
                        </div>
                        <p className="leading-relaxed pb-5 border-b-2 border-gray-100 mb-5">
                            {!expanded ? `${product.description.slice(0, 250)}...` : product?.description}{" "}
                            {product.description.length > 250 && <button onClick={() => setExpanded(!expanded)} className='text-blue-500 cursor-pointer'>{expanded ? "Read less" : "Read more"}</button>}
                        </p>
                        <div className="flex">
                            <span className="title-font font-medium text-2xl text-gray-900">${product?.price}</span>
                            <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none cursor-pointer hover:bg-indigo-600 rounded" onClick={() => addToCart(product)}>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductPage;

export async function getServerSideProps(context) {
    const response = await fetch(`https://fakestoreapi.com/products/${context.params.id}`)
    const product = await response.json()
    return {
        props: {
            product
        }
    };
}