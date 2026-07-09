import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Saree from "./pages/Saree.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return(
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/checkout/:id" element={<Checkout/>} />
      <Route path="/:id" element={<Saree/>} />
    </Routes>
  );
}

export default App;
