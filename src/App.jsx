import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Nav from './components/Nav';

function App() {
  return (
    <AuthProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route
          path="/inventory"
          element={<ProtectedRoute>{/* <Inventory /> */}</ProtectedRoute>}
        />
        {/* <Route path="/catalog" element={<Catalog />} /> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
