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
    getGold(userId);
    setLoading(false);
  }, [userId]);

  return (
    <main>
      <h1>D&D Inventory Management</h1>
      {!isLoggedIn && <NotLoggedIn />}
      {isLoggedIn && (
        <>
          <h2>Hello {user}</h2>
          <p>Gold: {gold}</p>
          <p>Net worth:</p>
        </>
      )}
    </main>
  );
};

// recently added items
// Net worth
// Most valuable items
// Equipped items

export default HomePage;
