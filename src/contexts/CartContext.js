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

    const handleQty = (id, type) => {
        if (type === "inc") {
            setCart({
                ...cart, [id]: {
                    ...cart[id], quantity: cart[id].quantity + 1
                }
            })
        } else {
            if (cart[id].quantity > 1) {
                setCart({
                    ...cart, [id]: {
                        ...cart[id], quantity: cart[id].quantity - 1
                    }
                })
            } else {
                removeFromCart(id)
            }
        }
    }

    const removeFromCart = (id) => {
        const newCart = { ...cart }
        delete newCart[id]
        setCart(newCart)
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, handleQty, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext }