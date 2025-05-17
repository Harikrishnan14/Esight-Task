import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'

const Cart = () => {
    const { cart, handleQty, removeFromCart } = useContext(CartContext)
    const totalCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = Object.values(cart).reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 md:py-18 py-10 mx-auto">
                <div className="-my-8 divide-y-2 divide-gray-100">
                    {Object.keys(cart)?.map((item) => (
                        <div className="py-8 flex flex-wrap md:flex-nowrap md:gap-8" key={cart[item]?.id}>
                            <div className="w-full md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={cart[item]?.image} />
                            </div>
                            <div className="md:flex-grow">
                                <div className='hidden md:flex items-center justify-between'>
                                    <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{cart[item]?.title}</h2>
                                    <span className='leading-relaxed text-lg font-semibold text-gray-700'>${cart[item]?.price}</span>
                                </div>
                                <h2 className="md:hidden text-2xl font-medium text-gray-900 title-font mb-2">{cart[item]?.title}</h2>
                                <p className="leading-relaxed text-lg font-semibold text-gray-700 mb-2">Category: <span className='text-gray-500 font-normal'>{cart[item]?.category}</span></p>
                                <p className="md:hidden leading-relaxed text-lg font-semibold text-gray-700 mb-2">Price: <span className='text-gray-500 font-normal'>${cart[item]?.price}</span></p>
                                <div className="flex items-center gap-4 mt-4">
                                    <span className="leading-relaxed text-lg font-semibold text-gray-700">Quantity:</span>
                                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                                        <button className="p-1 bg-gray-100 hover:bg-gray-200 text-xl font-bold cursor-pointer" onClick={() => handleQty(cart[item].id, "dec")}>−</button>
                                        <span className="px-2 text-lg">{cart[item]?.quantity}</span>
                                        <button className="p-1 bg-gray-100 hover:bg-gray-200 text-xl font-bold cursor-pointer" onClick={() => handleQty(cart[item].id, "inc")}>+</button>
                                    </div>
                                </div>
                                <button className="mt-4 text-red-600 hover:text-red-800 font-medium underline cursor-pointer" onClick={() => removeFromCart(cart[item].id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <h4 className='mt-8 md:my-8 mb-6 pt-8 border-t-1 border-gray-300 text-xl font-medium text-gray-900 title-font text-center md:text-right'>{`Subtotal (${totalCount} items): $${totalPrice}`}</h4>
                <button className="flex md:ml-auto md:mr-0 mx-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none cursor-pointer hover:bg-indigo-600 rounded">Proceed to Buy</button>
            </div>
        </section>
    )
}

export default Cart