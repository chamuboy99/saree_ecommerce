import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        if(decoded.exp * 1000 < Date.now()){
            localStorage.removeItem('token');
            navigate('/');
        }
        return children;
    } catch (error) {
        localStorage.removeItem('token');
        navigate('/');
    }

}