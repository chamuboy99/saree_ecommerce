import axios from "axios";
import { useEffect, useState } from "react";
import '../styles/sarees.css';
import { FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import EditSareeModal from "../components/EditSareeModal.jsx";
import Header from "../components/Header.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import { useContext } from "react";
import { FilterContext } from "../contexts/FilterContext.jsx";

export default function Sarees() {
    const [sarees, setSarees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingSaree, setEditingSaree] = useState(null);
    const { filters, search } = useContext(FilterContext);

    useEffect(() => {
        async function fetchSarees() {
            try {
                setLoading(true);

                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/sarees`,
                    {
                        params: {
                            ...filters,
                            search
                        }
                    }
                );

                setSarees(res.data);
            } catch (err) {
                console.error(err);
                setSarees([]);
            } finally {
                setLoading(false);
            }
        }

        fetchSarees();
    }, [filters, search]);

    const deleteSaree = async (id) => {
        const result = await Swal.fire({
            title: "Delete this item?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e53935",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/sarees/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSarees((prev) => prev.filter((item) => item._id !== id));

            await Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "The item has been deleted successfully.",
                timer: 1800,
                showConfirmButton: false,
            });

        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Something went wrong while deleting.",
            });
        } 
    };

    return (
        <>
            <Header />
            <CategoryFilter />
            <div className="sarees-main">
                {loading ? (
                    <div className="loader-container">
                        <div className="loader"></div>
                        <p>Loading Sarees...</p>
                    </div>
                ) : (
                    <div className="sarees-grid">
                        {sarees.length === 0 ? <p className="no-items">No items found</p>
                            : sarees.map((saree) => (
                                <div className="saree-card" key={saree._id}>
                                    <img src={saree.image} alt={saree.name} className="saree-image" onError={e => e.target.src = "/placeholder.jpg"} />
                                    <div className="card-content">
                                        <h2>{saree.name}</h2>
                                        <p className="category">
                                            {saree.category}
                                            {saree.subCategory && ` • ${saree.subCategory}`}
                                            {saree.subSubCategory && ` • ${saree.subSubCategory}`}
                                        </p>
                                        <p className="price"> Rs. {saree.price?.toLocaleString()} </p>
                                        <div className="btn-container">
                                            <button className="ctrl-btn" onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingSaree(saree);
                                                setShowModal(true);
                                            }}> <FaEdit /> </button>
                                            <button className="ctrl-btn" onClick={e => {
                                                e.stopPropagation();
                                                deleteSaree(saree._id);
                                            }}> <FaTrash /> </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
                <EditSareeModal
                    showModal={showModal}
                    editingSaree={editingSaree}
                    onClose={() => {
                        setShowModal(false);
                        setEditingSaree(null);
                    }}
                    onUpdated={(updatedSaree) => {
                        setSarees(prev => prev.map(item => item._id === updatedSaree._id ? updatedSaree : item)
                        );
                    }}
                />
            </div>

        </>
    );
}