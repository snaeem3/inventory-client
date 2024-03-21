import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthProvider.jsx';
import App from './App.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import './index.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
