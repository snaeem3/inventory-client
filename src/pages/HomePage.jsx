import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { fetchUserData } from '../apiClient';
import NotLoggedIn from '../components/NotLoggedIn';
import UserOverview from '../components/UserOverview';

const HomePage = (props) => {
  const { user: userName, userId, isLoggedIn, isAdmin } = useAuth();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const loadUserData = async (id) => {
    try {
      const data = await fetchUserData(id);
      setUser(data);
      console.log('loadUserData successful');
    } catch (error) {
      console.error('Error loading User Data: ', error);
      throw error;
    }
  };

  useEffect(() => {
    if (isLoggedIn) loadUserData(userId);
    setLoading(false);
  }, [userId, isLoggedIn]);

  return (
    <main className="home-page">
      <h1>D&D Inventory Management</h1>
      {isLoggedIn ? (
        <>
          <h2 className="welcome-back">Welcome Back {userName}</h2>
          <UserOverview
            name={userName}
            inventoryItems={user.itemInventory}
            gold={user.gold?.quantity}
            netWorth={user.netWorth}
          />
          <div className="links">
            <Link to="/inventory">
              <button type="button">View your Inventory</button>
            </Link>
            <Link to="/gold">
              <button type="button">View your Gold</button>
            </Link>
            <Link to="/catalog">
              <button type="button">View the Item Catalog</button>
            </Link>
          </div>
        </>
      ) : (
        <NotLoggedIn />
      )}
    </main>
  );
};

export default HomePage;
