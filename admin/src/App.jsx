import { Route, Routes } from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Dashboard from './pages/Dashboard.jsx';
import Sarees from './pages/Sarees.jsx';
import AddSarees from './pages/AddSaree.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import PublicRoute from './utils/PublicRoute.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path='/sarees' element={<ProtectedRoute><Sarees/></ProtectedRoute>}/>
        <Route path='/add-sarees' element={<ProtectedRoute><AddSarees/></ProtectedRoute>}/>
        <Route path='/admin-dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      </Routes>
    </>
  );
}

export default App
