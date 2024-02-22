import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import NotLoggedIn from './NotLoggedIn';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  console.log('isLoggedIn: ', isLoggedIn);

  return !isLoggedIn ? <NotLoggedIn /> : children;
};

export default ProtectedRoute;
