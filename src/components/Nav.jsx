import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Nav = (props) => {
  const { user, isLoggedIn, isAdmin, logout, profilePictureURL } = useAuth();
  const [showUserLinks, setShowUserLinks] = useState(false);

  return (
    <nav>
      <div>
        <ul className="main-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catalog">Item Catalog</Link>
          </li>
        </ul>
        {isLoggedIn ? (
          <div className="logged-in-nav">
            <ul>
              <li>
                <Link to="/inventory">Inventory</Link>
              </li>
              <li>
                <Link to="/gold">Gold</Link>
              </li>
            </ul>
            <button
              type="button"
              className={showUserLinks ? `active` : `inactive`}
              onClick={() => setShowUserLinks((prevState) => !prevState)}
            >
              {profilePictureURL ? (
                <img src={profilePictureURL} alt="avatar" className="avatar" />
              ) : (
                user
              )}
            </button>
            {showUserLinks && (
              <ul className="user-links">
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <button type="button" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
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
      </div>
    </nav>
  );
};

export default Nav;
