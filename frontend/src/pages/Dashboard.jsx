import { useCallback, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { CartContext } from "../context/CartContext.jsx";
import '../styles/dashboard.css';
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter.jsx";

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({});

    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const fetchProducts = useCallback(async (currentFilters = {}) => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/sarees`,
                {
                    params: currentFilters
                }
            );

            setProducts(res.data);
        } catch (err) {
            console.error("Failed to fetch products:", err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts(filters);
    }, [fetchProducts, filters]);

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
        setFilterOpen(false);
    };

    const clearFilters = () => {
        setFilters({});
        setFilterOpen(false);
    };

    return (
        <>
            <Header
                filterOpen={filterOpen}
                setFilterOpen={setFilterOpen}
            />

            <CategoryFilter
                open={filterOpen}
                onFilter={handleFilter}
                clearFilters={clearFilters}
            />

            <div className="home-main">
                {loading ? (
                    <div className="loader-container">
                        <div className="loader"></div>
                        <p>Loading Sarees...</p>
                    </div>
                ) : (
                    <div className="products">
                        {products.map((p) => (
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