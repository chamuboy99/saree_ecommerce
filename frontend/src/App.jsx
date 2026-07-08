import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Saree from "./pages/Saree.jsx";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/checkout/:id" element={<Checkout/>} />
        <Route path="/:id" element={<Saree/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
