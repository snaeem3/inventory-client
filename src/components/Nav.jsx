import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Nav = (props) => {
  const { userId, isLoggedIn, isAdmin, logout } = useAuth();

  return (
    <nav>
      {isLoggedIn ? (
        <ul>
          <li>Hello</li>
          <li>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/log-in">
              <button type="button">Log In</button>
            </Link>
          </li>
          <li>
            <Link to="/sign-up">
              <button type="button">Sign Up</button>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
