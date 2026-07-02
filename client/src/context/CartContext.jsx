import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(i => i._id === product._id);

            if (existing) {
                return prev.map(i => i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i);
            }

            return [...prev, { ...product, quantity: 1 }];
        });
        alert(`${product.name} added to cart!`);
    }

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(i => i._id !== id));
    }

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}