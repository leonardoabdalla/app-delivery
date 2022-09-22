import React from 'react';
import './App.css';
import { Navigate, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Products from './pages/products';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/register" element={ <Register /> } />
        <Route exact path="/customer/products" element={ <Products /> } />
      </Routes>
    </div>
  );
}

export default App;
