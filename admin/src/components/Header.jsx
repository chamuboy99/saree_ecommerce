import { useNavigate } from 'react-router-dom';
import '../styles/header.css';
import Swal from 'sweetalert2';
import { FaHome, FaBars, FaSearch } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";

export default function Header(){
    const navigate = useNavigate();

    const logout = async () => {
        const result = await Swal.fire({
            title: "Are you logging out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e53935",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Logout",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        localStorage.removeItem('token');
        navigate('/');
    }

    return(
        <header className="header">
            <div className="header-container">

                <button className="navi-btn">
                    <FaBars />
                </button>

                <div className="search-container">
                    <input 
                        className="search-input" 
                        placeholder="Search products..." 
                    />
                    <button className='search-btn'>
                        <FaSearch />
                    </button>
                </div>

                <div className="navi-buttons">
                    <button className="navi-btn" onClick={()=>navigate('/')}>
                        <FaHome />
                    </button>

                    <button className="navi-btn" onClick={()=>logout()}>
                        <FiLogOut />
                    </button>
                </div>

            </div>
        </header>
    );
}