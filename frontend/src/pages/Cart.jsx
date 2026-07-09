import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../context/CartContext.jsx";
import '../styles/cart.css';
import Header from "../components/Header.jsx";
import { FaTrash } from "react-icons/fa";
import { FilterContext } from "../context/FilterContext.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";

export default function Cart() {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
    const { filterOpen } = useContext(FilterContext);
    const navigate = useNavigate();

    useEffect(()=>{
        
    },[])

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <Header />
            <CategoryFilter
                open={filterOpen}
            />
            <div className="cart-main">
                <h1>Cart</h1>

                {cart.length === 0 ? (
                    <p>Cart is empty</p>
                ) : (
                    <>
                        {cart.map(item => (
                            <div className="cart-item" key={item._id} onClick={()=>navigate(`/${item._id}`)}>
                                <img src={item.image} alt={item.name} />
                                <div className="cart-details">
                                    <p>{item.name}</p>
                                    <div className="q-div">
                                        <span>Quantity</span>
                                        <div className="quantity-control">
                                            <button onClick={(e) => {
                                                    e.stopPropagation();
                                                    decreaseQuantity(item._id);
                                                }}
                                            >
                                                −
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={(e) => {
                                                    e.stopPropagation();
                                                    increaseQuantity(item._id);
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <p>Rs. {item.price}</p>
                                    <p>Subtotal: Rs. {item.quantity * item.price}</p>
                                </div>
                                <button onClick={(e) => {
                                    removeFromCart(item._id);
                                    e.stopPropagation();
                                }}>
                                    <FaTrash/>
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