import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import '../styles/order.css';
import OrderStatusModal from "../components/OrderStatusModal";
import CategoryFilter from "../components/CategoryFilter.jsx";
import { FilterContext } from "../contexts/FilterContext.jsx";

const Orders = () => {
    const { showSideBar } = useContext(FilterContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/order`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setOrders(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <>
            <Header />
            <CategoryFilter />
            <div className="orders-page">

                <div className="orders-header">
                    <h1>Orders</h1>
                    <span>{orders.length} Orders</span>
                </div>

                {loading ? (
                    <div className="loading">
                        Loading orders...
                    </div>
                ) : orders.length === 0 ? (
                    <div className="empty-state">
                        No Orders Found
                    </div>
                ) : (
                    <div className="orders-container">

                        {orders.map((order) => (
                            <div className="order-card" key={order._id}>

                                <div className="order-top">
                                    <div>
                                        <h2>{order.customerName}</h2>
                                        <p>{order.phoneNumber}</p>
                                    </div>

                                    <span className={`status ${order.status.toLowerCase().replace(/\s+/g, "-")}`} onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingOrder(order);
                                        setShowModal(true);
                                    }}>
                                        {order.status}
                                    </span>
                                </div>

                                <div className="customer-details">
                                    <p>
                                        <strong>Address</strong>
                                        <span>{order.address}</span>
                                    </p>

                                    <p>
                                        <strong>Notes</strong>
                                        <span>{order.notes || "None"}</span>
                                    </p>

                                    <p>
                                        <strong>Total</strong>
                                        <span>Rs. {order.totalAmount}</span>
                                    </p>
                                </div>

                                <div className="items-grid">
                                    {order.items.map((item) => (
                                        <div className="item-card" key={item._id}>
                                            <img src={item.image} alt={item.name}/>
                                            <div>
                                                <h4>{item.name}</h4>
                                                <p>Qty : {item.quantity}</p>
                                                <span>
                                                    Rs. {item.price}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}

                    </div>
                )}
                <OrderStatusModal
                    showModal={showModal}
                    editingOrder={editingOrder}
                    onClose={() => {
                        setShowModal(false);
                        setEditingOrder(null);
                    }}
                    onUpdated={(updatedOrder) => {
                        setOrders(prev => prev.map(i => i._id === updatedOrder._id ? updatedOrder : i));
                    }}
                />
            </div>
        </>
    );
};

export default Orders;