import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import NotLoggedIn from '../components/NotLoggedIn';

const Inventory = (props) => {
  const { user, isLoggedIn, isAdmin } = useAuth();

  const [searchText, setSearchText] = useState('');
  const [sortMethod, setSortMethod] = useState('A-Z');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };

  return (
    <main>
      <h1>Your Inventory</h1>
      {!isLoggedIn && <NotLoggedIn />}
      {isLoggedIn && (
        <>
          <h2>Your Items</h2>
          <div className="inventory-controls-container">
            <div className="search-box">
              <label htmlFor="search-bar">Search Your Inventory</label>
              <div className="search-bar-wrapper">
                <span className="input" />
                <input
                  type="search"
                  id="search-bar"
                  name="search-bar"
                  onChange={(e) => handleSearchChange(e)}
                />
              </div>
            </div>
            <div className="sort-box">
              <label htmlFor="sort-select">Sort Items by:</label>
              <select
                name="sort-select"
                id="sort-select"
                onChange={(e) => handleSortChange(e)}
              >
                {/* <option value="">--Please choose an option--</option> */}
                <option value="A-Z">Name A-Z</option>
                <option value="Z-A">Name Z-A</option>
                <option value="low-high">Value low-high</option>
                <option value="high-low">Value high-low</option>
              </select>
            </div>
            {/* <div className="equipped-box">
              <label htmlFor="hide-out-of-stock">Hide Out of Stock?</label>
              <input
                type="checkbox"
                name="hide-out-of-stock"
                id="hide-out-of-stock"
                className="toggle box-shadow"
                onClick={(e) => setHideOutOfStock(e.target.checked)}
              />
            </div> */}
          </div>
        </>
      )}
    </main>
  );
};

// recently added items
// Net worth
// Most valuable items
// Equipped items

export default Inventory;
