import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NotFound = (props) => {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();

  return (
    <>
      <h1>Page Not Found</h1>
      <p>The requested page could not be found</p>
    </>
  );
};

export default NotFound;
