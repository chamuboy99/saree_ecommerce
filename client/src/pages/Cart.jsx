import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../context/CartContext.jsx";

export default function Cart() {
    const { cart, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <h1>Cart</h1>
            {cart.length === 0 ? <p>Cart is empty</p> : cart.map(item => (
                <div key={item._id}>
                    <img src={item.image} alt="" />
                    <p>{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Rs. {item.quantity * item.price}</p>
                    <button onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
            ))}

            <h1>Total: Rs.{total}</h1>

            <button onClick={() => navigate('/checkout')}>Checkout</button>

        </div>
    );
}