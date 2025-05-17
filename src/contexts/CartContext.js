import { createContext, useState } from "react";

const CartContext = createContext()

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState({})

    const addToCart = (item) => {
        if (cart[item.id]) {
            setCart({
                ...cart, [item.id]: {
                    ...item, quantity: cart[item.id].quantity + 1
                }
            })
        } else {
            setCart({
                ...cart, [item.id]: {
                    ...item, quantity: 1
                }
            })
        }
    }

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext }