import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { CartContext } from "../context/CartContext.jsx";
import '../styles/home.css';

export default function Home() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await axios.get('http://localhost:5000/api/sarees');
        setProducts(res.data);
    }

    return (
        <div className="home-main">
            <h1>Saree Collection</h1>
                <div>
                    {products.map(p => (
                        <div key={p._id} >
                            <img src={p.image} alt="" />
                            <h2>{p.name}</h2>
                            <p><b>Rs.{p.price}/=</b></p>
                            <button onClick={() => addToCart(p)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
        </div>

    );
}