import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const CartContext = createContext();


export const CartProvider = ({ children }) => {
    
    const [cart, setCart] = useState(()=>{
        const savedCart = localStorage.getItem('cart');
        if(!savedCart) return [];

        try {
            const { cart, expiresAt } = JSON.parse(savedCart);

            if (Date.now() > expiresAt) {
                localStorage.removeItem("cart");
                return [];
            }

            return cart;
        } catch {
            localStorage.removeItem("cart");
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            "cart",
            JSON.stringify({
                cart,
                expiresAt: Date.now() + 24 * 60 * 60 * 1000 * 2,
            })
        );
    }, [cart]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(i => i._id === product._id);

            if (existing) {
                return prev.map(i => i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i);
            }

            return [...prev, { ...product, quantity: 1 }];
        });

        Swal.fire({
            icon: "success",
            title: "Added to Cart",
            timer: 1800,
            showConfirmButton: false,
        });
    }

    const increaseQuantity = (id) => {
        setCart(prev => prev.map(i => i._id === id ? { ...i, quantity: i.quantity + 1 } : i));
    }

    const decreaseQuantity = (id) => {
        setCart(prev => prev.map(i => i._id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i));
    }

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(i => i._id !== id));
    }

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
}