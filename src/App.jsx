import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Inventory from './pages/Inventory';
import Nav from './components/Nav';
import Catalog from './pages/Catalog';
import ItemDetail from './pages/ItemDetail';
import NotFound from './components/NotFound';
import CreateItem from './pages/CreateItem';
import UpdateItem from './pages/UpdateItem';

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
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/item/:itemId" element={<ItemDetail />} />
        <Route
          path="/item/create"
          element={
            <ProtectedRoute>
              <CreateItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="catalog/item/create"
          element={
            <ProtectedRoute>
              <CreateItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/catalog/item/:itemId/update"
          element={
            <ProtectedRoute>
              <UpdateItem />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
