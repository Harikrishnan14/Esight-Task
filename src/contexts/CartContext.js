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
console.log(cart);

    const handleQty = (id, type) => {
        console.log(id);
        
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
                // removeFromcart()
            }
        }
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, handleQty }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext }