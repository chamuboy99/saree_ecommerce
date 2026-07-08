import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import '../styles/saree.css';
import { CartContext } from "../context/CartContext";

export default function Saree() {
    const { id } = useParams();
    const [saree, setSaree] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSaree = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/sarees/${id}`);
                setSaree(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchSaree();
    }, [id]);

    return(
        <>
            <Header/>
            <div className="saree-main">
                <div>
                    {loading ? (
                        <div className="loader-container">
                            <div className="loader"></div>
                            <p>Loading Sarees...</p>
                        </div>
                    ): (
                        <div className="saree-details">
                            <img src={saree.image} alt="" />
                            <div className="saree-info">
                                <h2>{saree.name}</h2>
                                <p>{saree.description}</p>
                                <p>Rs.{saree.price}</p>
                                <div className="cb-btns">
                                    <button onClick={()=>navigate(`/checkout/${id}`)}>
                                        <FaShoppingBag/>
                                        <span>Buy Now</span>
                                    </button>
                                    <button onClick={()=>addToCart(saree)}>
                                        <FaShoppingCart/>
                                        <span>Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div> 
                    )}
                    
                </div>
            </div>
        </>
    );

}