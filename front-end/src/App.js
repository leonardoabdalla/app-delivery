import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navigate, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Products from './pages/products';
import Checkout from './pages/checkout';
import Orders from './pages/orders';
import SaleDetail from './pages/saleDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/register" element={ <Register /> } />
        <Route exact path="/customer/products" element={ <Products /> } />
        <Route exact path="/customer/checkout" element={ <Checkout /> } />
        <Route exact path="/customer/orders" element={ <Orders /> } />
        <Route exact path="/customer/orders/:id" element={ <SaleDetail /> } />
      </Routes>
    </div>
  );
}

export default App;
