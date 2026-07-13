import axios from "axios";
import { useEffect, useState } from "react";

export default function Sarees(){
    const [sarees, setSarees] = useState([]);

    useEffect(()=>{
        async function fetchSarees(){
             try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/sarees`
                );
                setSarees(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchSarees();
    },[]);

    return(
        <>
            <div className="sarees-main">
                <div>
                    {sarees.length === 0 ? <p>No items found</p> : sarees.map(saree => (
                        <div key={saree._id}>
                            <img src={saree.image} alt="No Image Found" />
                            <h2>{saree.name}</h2>
                            <p>{saree.category} {saree.subCategory} {saree.subSubCategory}</p>
                            <p>Rs.{saree.price}</p>
                            <button>Edit</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}