import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import NotLoggedIn from '../components/NotLoggedIn';

const HomePage = (props) => {
  const { user, isLoggedIn, isAdmin } = useAuth();
  return (
    <main>
      <h1>D&D Inventory Management</h1>
      {!isLoggedIn && <NotLoggedIn />}
      {isLoggedIn && (
        <>
          <h2>Hello {user}</h2>
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
