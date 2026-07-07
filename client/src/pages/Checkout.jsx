import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { CartContext } from "../context/CartContext.jsx";
import '../styles/checkout.css';
import Header from "../components/Header.jsx";

export default function Checkout() {
    const navigate = useNavigate();
    const { cart, clearCart } = useContext(CartContext);
    const [ formData, setFormData ] = useState({
        customerName: "",
        phoneNumber: "",
        address: "",
        notes: ""
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const placeOrder = async () => {
        const items = cart.map(i => ({
            productId: i._id,
            quantity: i.quantity
        }));

        await axios.post(`${process.env.REACT_APP_API_URL}/api/order`, {
            ...formData,
            items
        });

        alert("Order placed successfully!");
        clearCart();
        navigate('/');
    }

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return(
        <>
            <Header/>
            <div className="checkout-main">
                <h1>Checkout</h1>
                {cart.map(i => (
                    <div key={i._id} className="checkout-item">
                        <img src={i.image} alt="" />
                        <div className="checkout-item-details">
                            <p><b>{i.name}</b></p>
                            <p>Quantity: {i.quantity}</p>
                            <p>Rs.{i.price}</p>
                            <p>Subtotal: Rs.{i.price * i.quantity}</p>
                        </div>
                    </div>
                ))}
                <h2>Total: Rs.{total}</h2>
                <div className="payment-method">
                    🚚 <strong>Payment Method:</strong> Cash on Delivery
                </div>
                <div className="checkout-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Contact Number</label>
                        <input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Notes</label>
                        <input type="text" name="notes" value={formData.notes} onChange={handleChange} placeholder="optional"/>
                    </div>

                    <button onClick={placeOrder}>Confirm</button>
                </div>
                
            </div>
        </>
    );

}