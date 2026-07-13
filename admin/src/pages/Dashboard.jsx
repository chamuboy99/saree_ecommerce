import { useNavigate } from "react-router-dom";
import '../styles/dashboard.css';

export default function Dashboard(){
    const navigate = useNavigate();
    return (
        <div className="admin-dashboard-main">
            <div className="dashboard-card">
                <h1>Admin Dashboard</h1>
                <p>Manage your saree collection with ease.</p>

                <div className="dashboard-buttons">
                    <button onClick={() => navigate("/sarees")}>
                        View Items
                    </button>

                    <button onClick={() => navigate("/add-sarees")}>
                        Add Item
                    </button>
                </div>
            </div>
        </div>
    );
}