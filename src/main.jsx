import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthProvider.jsx';
import App from './App.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'sign-up',
    element: <Signup />,
  },
  {
    path: 'log-in',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
