import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const HomePage = (props) => {
  const { userId, isLoggedIn, isAdmin } = useAuth();
  return (
    <>
      <h1>D&D Inventory Management</h1>
      {isLoggedIn && <p>{userId}</p>}
      {!isLoggedIn && <p>You are not logged in</p>}
    </>
  );
};

export default HomePage;
