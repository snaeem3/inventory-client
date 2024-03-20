import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { fetchUserData } from '../apiClient';
import Loading from '../components/Loading';
import UserOverview from '../components/UserOverview';

const User = (props) => {
  const { userId: paramUserId } = useParams();
  const { userId, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

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
    loadUserData(paramUserId);
  }, [paramUserId]);

  return (
    <main className="user-page">
      <h1>{user.name}</h1>
      {user.profilePicture && <img src={user.profilePicture} alt="avatar" />}
      <UserOverview
        name={user.name}
        inventoryItems={user.itemInventory}
        joined={user.createdAt}
        gold={user.gold?.quantity}
        netWorth={user.netWorth}
      />
      <div className="user-links">
        <Link to={`/users/${paramUserId}/inventory`}>View Inventory</Link>
      </div>
    </main>
  );
};

export default User;
