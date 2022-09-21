import React from 'react';
import './App.css';
import { Navigate, Routes, Route } from 'react-router-dom';
import Login from './pages/login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route exact path="/login" element={ <Login /> } />
      </Routes>
    </div>
  );
}

export default App;
