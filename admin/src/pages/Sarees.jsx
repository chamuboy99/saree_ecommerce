import axios from "axios";
import { useEffect, useState } from "react";
import '../styles/sarees.css';

export default function Sarees(){
    const [sarees, setSarees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function fetchSarees(){
             try {
                setLoading(true);
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/sarees`
                );
                setSarees(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchSarees();
    },[]);

    return (
        <div className="sarees-main">
            {loading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                    <p>Loading Sarees...</p>
                </div>
            ) : ( 
                <div className="sarees-grid">
                    {sarees.length === 0 ? <p className="no-items">No items found</p> :sarees.map((saree) => (
                        <div className="saree-card" key={saree._id}>
                            <img
                                src={saree.image}
                                alt={saree.name}
                                className="saree-image"
                            />

                            <div className="card-content">
                                <h2>{saree.name}</h2>

                                <p className="category">
                                    {saree.category}
                                    {saree.subCategory && ` • ${saree.subCategory}`}
                                    {saree.subSubCategory && ` • ${saree.subSubCategory}`}
                                </p>

                                <p className="price">
                                    Rs. {saree.price.toLocaleString()}
                                </p>

                                <button className="edit-btn">
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}