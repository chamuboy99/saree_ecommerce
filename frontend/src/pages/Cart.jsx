import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../context/CartContext.jsx";
import '../styles/cart.css';
import Header from "../components/Header.jsx";

export default function Cart() {
    const { cart, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <Header />
            <div className="cart-main">
                <h1>Cart</h1>

                {cart.length === 0 ? (
                    <p>Cart is empty</p>
                ) : (
                    <>
                        {cart.map(item => (
                            <div className="cart-item" key={item._id}>
                                <img src={item.image} alt={item.name} />
                                <div className="cart-details">
                                    <p>{item.name}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Rs. {item.price}</p>
                                    <p>Subtotal: Rs. {item.quantity * item.price}</p>
                                </div>
                                <button onClick={() => removeFromCart(item._id)}>
                                    Remove
                                </button>
                            </div>
                        ))}

                        <h2>Total: Rs. {total}</h2>

                        <button onClick={() => navigate("/checkout")}>
                            Checkout
                        </button>
                    </>
                )}
            </div>
        </>
    );
}