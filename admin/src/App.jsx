import { Route, Routes } from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Dashboard from './pages/Dashboard.jsx';
import Sarees from './pages/Sarees.jsx';
import AddSarees from './pages/AddSaree.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/sarees' element={<Sarees/>}/>
        <Route path='/add-sarees' element={<AddSarees/>}/>
        <Route path='/admin-dashboard' element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App
