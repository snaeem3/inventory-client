import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { fetchGold } from '../apiClient';
import NotLoggedIn from '../components/NotLoggedIn';

const HomePage = (props) => {
  const { user, userId, isLoggedIn, isAdmin } = useAuth();
  const [gold, setGold] = useState(0);
  const [loading, setLoading] = useState(true);

  const getGold = async (id) => {
    try {
      const data = await fetchGold(id);
      setGold(data.quantity);
    } catch (error) {
      console.error('Error getting gold data: ', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) getGold(userId);
    setLoading(false);
  }, [userId, isLoggedIn]);

  return (
    <main>
      <h1>D&D Inventory Management</h1>
      {isLoggedIn ? (
        <>
          <h2>Hello {user}</h2>
          <div className="user-stats-container">
            <p>Gold: {gold}</p>
            <p>Net worth:</p>
          </div>
        </>
      ) : (
        <NotLoggedIn />
      )}
    </main>
  );
};

// recently added items
// Net worth
// Most valuable items
// Equipped items

export default HomePage;
