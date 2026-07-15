import { useNavigate } from "react-router-dom";
import '../styles/dashboard.css';
import Header from "../components/Header.jsx";
import { FilterContext } from "../contexts/FilterContext.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import { useContext } from "react";

export default function Dashboard(){
    const { showSideBar } = useContext(FilterContext);
    const navigate = useNavigate();
    return (
        <>
            <Header/>
            <CategoryFilter />
            <div className="admin-dashboard-main">
                <div className="dashboard-card">
                    <h1>Admin Dashboard</h1>
                    <p>Manage your saree collection with ease.</p>

                    <div className="dashboard-buttons">
                        <button onClick={() => navigate("/sarees")}> View Items </button>
                        <button onClick={() => navigate("/add-sarees")}> Add Item </button>
                        <button onClick={() => navigate("/orders")}> Orders </button>
                    </div>
                </div>
            </div>
        </>
    );
}