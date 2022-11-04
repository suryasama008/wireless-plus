import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { DataContextProvider } from './context/DataContext';
import { AddProduct } from './pages/AddProduct';
import Calender from './components/Calender';
import Invoice from "./components/Invoice/Invoice"
import UpdateProduct from './pages/UpdateProduct'
import ProductForm from "./components/ProductForm/ProductForm"
import Reports from './pages/Reports';
function App() {
  return (
    <>
      <AuthContextProvider>
        <DataContextProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/addproduct' element={<AddProduct />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/invoice' element={<Invoice />} />
            <Route path='/updateProduct' element={<ProductForm />} />
          </Routes>
        </DataContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App;
