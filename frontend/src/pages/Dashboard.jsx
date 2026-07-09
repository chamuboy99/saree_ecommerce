import { useCallback, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { CartContext } from "../context/CartContext.jsx";
import '../styles/dashboard.css';
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter.jsx";
import { FilterContext } from "../context/FilterContext.jsx";

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useContext(CartContext);
    const { filters, filterOpen, search } = useContext(FilterContext);

    const navigate = useNavigate();

    const fetchProducts = useCallback(async (currentFilters = {}) => {
        try {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/sarees`, { params: currentFilters });
            setProducts(res.data);
        } catch (err) {
            console.error("Failed to fetch products:", err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts({
            ...filters,
            search
        });
    }, [fetchProducts, filters, search]);

    return (
        <>
            <Header />
            <CategoryFilter open={filterOpen} />

            <div className="home-main">
                {loading ? (
                    <div className="loader-container">
                        <div className="loader"></div>
                        <p>Loading Sarees...</p>
                    </div>
                ) : (
                    <div className="products">
                        
                        {products.length === 0 ? <p className="no-items">No items</p> : products.map((p) => (
                            <div key={p._id} onClick={() => navigate(`/${p._id}`)}>
                                {p.bestSeller && (
                                    <span className="best-seller-badge">
                                        Best Seller
                                    </span>
                                )}
                                <img src={p.image} alt={p.name} />
                                <h2>{p.name}</h2>
                                <p> <b>Rs. {p.price}</b></p>

                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(p);
                                }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}