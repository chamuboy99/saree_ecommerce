import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { CartContext } from "../context/CartContext.jsx";
import '../styles/checkout.css';
import Header from "../components/Header.jsx";

export default function Checkout() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [saree, setSaree] = useState(null);
    const [loading, setLoading] = useState(true);
    const { cart, clearCart } = useContext(CartContext);
    const [ formData, setFormData ] = useState({
        customerName: "",
        phoneNumber: "",
        address: "",
        notes: ""
    });
    
    useEffect(() => {
        if (!id) return;

        const fetchSaree = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/sarees/${id}`);
            setSaree(res.data);
            setLoading(false);
        };

        fetchSaree();
    }, [id]);

    const total = id ? saree?.price || 0 : cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const placeOrder = async () => {
        let items = [];

        if(id){
            items = [
                {
                    productId: saree._id,
                    quantity: 1
                }
            ];
        } else {
            items = cart.map(i => ({
                productId: i._id,
                quantity: i.quantity
            }));
        }

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
                {!id ? cart.map(i => (
                    <div key={i._id} className="checkout-item">
                        <img src={i.image} alt="" />
                        <div className="checkout-item-details">
                            <p><b>{i.name}</b></p>
                            <p>Quantity: {i.quantity}</p>
                            <p>Rs.{i.price}</p>
                            <p>Subtotal: Rs.{i.price * i.quantity}</p>
                        </div>
                    </div>
                )):( loading ? (
                        <div className="loader-container">
                            <div className="loader"></div>
                            <p>Loading Sarees...</p>
                        </div>
                    ) : (
                        <div className="checkout-item">
                            <img src={saree.image} alt="" />
                            <div className="checkout-item-details">
                                <p><b>{saree.name}</b></p>
                                <p>Rs.{saree.price}</p>
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