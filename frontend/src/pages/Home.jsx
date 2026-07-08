import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { CartContext } from "../context/CartContext.jsx";
import '../styles/home.css';
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [saree, setSaree] = useState({});
    const { addToCart } = useContext(CartContext);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/sarees`);
        setProducts(res.data);
        setLoading(false);
    }

    return (
        <>
            <Header />
            <div className="home-main">
                <h1>Saree Collection</h1>
                {loading ? (
                    <div className="loader-container">
                        <div className="loader"></div>
                        <p>Loading Sarees...</p>
                    </div>
                ) : (
                    <div className="products">
                        {products.map(p => (
                            <div key={p._id} onClick={() => navigate(`/${p._id}`)}>
                                <img src={p.image} alt="" />
                                <h2>{p.name}</h2>
                                <p><b>Rs.{p.price}/=</b></p>
                                <button onClick={(e) => {
                                    addToCart(p);
                                    e.stopPropagation();
                                }}>Add to Cart</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}