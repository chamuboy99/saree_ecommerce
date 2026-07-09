import { useContext } from 'react';
import '../styles/header.css';
import { FaHome, FaShoppingCart, FaBars, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FilterContext } from '../context/FilterContext';

export default function Header() {
    const {filterOpen, setFilterOpen} = useContext(FilterContext);
    const navigate = useNavigate();
    return (
        <header className="header">
            <div className="header-container">

                <button className="navi-btn" onClick={()=>setFilterOpen(!filterOpen)}>
                    <FaBars />
                </button>

                <div className="search-container">
                    <input 
                        className="search-input" 
                        placeholder="Search products..." 
                        type="text"
                    />
                    <FaSearch />
                </div>

                <div className="navi-buttons">
                    <button className="navi-btn" onClick={()=>navigate('/')}>
                        <FaHome />
                    </button>

                    <button className="navi-btn" onClick={()=>navigate('/cart')}>
                        <FaShoppingCart />
                    </button>
                </div>

            </div>
        </header>
    );
}