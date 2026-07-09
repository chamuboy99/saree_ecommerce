import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryFilter from "../components/CategoryFilter";
import { FilterContext } from "../context/FilterContext";

export default function Home() {
  const navigate = useNavigate();

  const [bestSellers, setBestSellers] = useState([]);

  const {filterOpen, clearFilters} = useContext(FilterContext);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/sarees`);
        const sellers = res.data.filter(item => item.bestSeller === true );
        setBestSellers(sellers.slice(0, 6));
        console.log(sellers);
      } catch (error) {
        console.error("Failed to fetch products", error.message);
      }
    };

    fetchBestSellers();
  }, []);


  return (
    <>
    <Header/>
    <CategoryFilter
        open={filterOpen}
        clearFilters={clearFilters}
    />
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero">
        
        <div className="hero-content">
          <h1>Discover Sarees <br/> You'll Love </h1>
          <p>
            Explore premium quality sarees carefully selected
            for you. Enjoy a simple, secure and enjoyable shopping
            experience.
          </p>
          <button className="primary-btn" onClick={() => navigate("/dashboard")}>Buy Sarees </button>
        </div>

        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1614951841462-92cb7e25f7fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Shopping"/>
        </div>

      </section>

      {/* Best Sellers */}
      <section className="best-sellers">
        <div className="section-header">
          <h2> Best Sellers </h2>
          <button className="view-all" onClick={() => navigate("/dashboard")}> View All → </button>
        </div>

        <div className="product-grid">
          {bestSellers.map(product => (
            <div className="product-card" key={product._id}>
              <span className="best-seller-badge">
                  Best Seller
              </span>
              <img src={product.image} alt={product.name}/>
              
              <div className="product-info">
                <h3> {product.name} </h3>
                <p>{product.category} {product.subCategory} {product.subSubCategory}</p>

                <div className="product-footer">
                  <span> Rs.{product.price} </span>
                  <button onClick={() => navigate(`/${product._id}`)}> View</button>
                </div>

              </div>
            </div>
          ))}
        </div>
        { bestSellers.length === 0 && <p className="empty"> No best sellers available.</p>}
      </section>

      {/* Features */}
      <section className="features">
        <h2> Why Shop With Us? </h2>

        <div className="feature-grid">
            <div className="feature-card">
                <h3>Premium Quality</h3>
                <p>Carefully selected products with excellent quality.</p>
            </div>
            <div className="feature-card">
                <h3>Fast Delivery</h3>
                <p>Quick and reliable delivery to your doorstep.</p>
            </div>
            <div className="feature-card">
                <h3>Secure Payments</h3>
                <p>Safe payment methods with customer protection.</p>
            </div>
        </div>
      </section>

    </div>
    <Footer/>
    </>
  );
}