import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import NotLoggedIn from '../components/NotLoggedIn';
import {
  fetchInventory,
  changeInventoryItem,
  deleteInventoryItem,
} from '../apiClient';

const Inventory = (props) => {
  const { userId, isLoggedIn } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortMethod, setSortMethod] = useState('A-Z');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };

  const getInventoryItems = async () => {
    try {
      const data = await fetchInventory(userId);
      console.log(data);
      setInventory(data);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  async function handleChangeQuantity(itemId, newQuantity) {
    try {
      const response = await changeInventoryItem(userId, itemId, {
        newQuantity,
      });
      console.log('Quantity change successful', response);
      await getInventoryItems();
    } catch (error) {
      console.error('Error changing quantity: ', error);
    }
  }

  async function handleDeleteInventoryItem(itemId) {
    try {
      const response = await deleteInventoryItem(userId, itemId);
      console.log('Delete inventory item successful', response);
      await getInventoryItems();
    } catch (error) {
      console.error('Error deleting inventory item: ', error);
    }
  }

  useEffect(() => {
    getInventoryItems();
  }, []);

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
            {/* <div className="equipped-box"></div> */}
          </div>
          <div className="">
            <ul>
              {inventory.map((inventoryItem) => (
                <li key={inventoryItem.item._id}>
                  <Link to={`/catalog/item/${inventoryItem.item._id}`}>
                    {inventoryItem.item.name}
                  </Link>
                  <div className="quantity">
                    <button
                      type="button"
                      onClick={() =>
                        handleChangeQuantity(
                          inventoryItem.item._id,
                          inventoryItem.quantity - 1,
                        )
                      }
                    >
                      -
                    </button>
                    <p>{inventoryItem.quantity}</p>
                    <button
                      type="button"
                      onClick={() =>
                        handleChangeQuantity(
                          inventoryItem.item._id,
                          inventoryItem.quantity + 1,
                        )
                      }
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="delete"
                      onClick={() =>
                        handleDeleteInventoryItem(inventoryItem.item._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
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
