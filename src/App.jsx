import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import Inventory from './pages/Inventory';
import Gold from './pages/Gold';
import Nav from './components/Nav';
import Catalog from './pages/Catalog';
import ItemDetail from './pages/ItemDetail';
import NotFound from './components/NotFound';
import CreateItem from './pages/CreateItem';
import UpdateItem from './pages/UpdateItem';
import Users from './pages/Users';
import User from './pages/User';
import Footer from './components/Footer';

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
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gold"
          element={
            <ProtectedRoute>
              <Gold />
            </ProtectedRoute>
          }
        />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/item/:itemId" element={<ItemDetail />} />
        <Route path="/item/:itemId" element={<ItemDetail />} />
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
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<User />} />
        <Route
          path="/users/:userId/inventory"
          element={<Inventory readOnly />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
