import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../styles/login.css';

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleLogin = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/login`, formData);
            localStorage.setItem('token', res.data);
            setFormData({ email: "", password: "" });
            navigate("/admin-dashboard");
        } catch (error) {
            setLoading(false);
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Unable to connect to the server. Please try again.");
            }
        }
    }

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>
            <div className="login-main">
                <div>
                    <div>
                        <label>Email: </label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button onClick={() => handleLogin()} disabled={loading} className={loading ? "loading" : ""}>{loading ? "Logging in..." : "Login"}</button>
                </div>
            </div>
        </>
    );

}