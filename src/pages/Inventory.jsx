import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/Loading';
import NotLoggedIn from '../components/NotLoggedIn';
import {
  fetchInventory,
  changeInventoryItem,
  toggleEquipped,
  deleteInventoryItem,
  fetchUserData,
} from '../apiClient';
import SearchSortControls from '../components/SearchSortControls';
import sortArrayOfItems from '../utils/sortArrayOfItems';

const Inventory = (props) => {
  const { readOnly } = props;
  const { userId: paramUserId } = useParams();
  const { userId, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState([]);
  const [paramUserName, setParamUserName] = useState(paramUserId);
  const [searchText, setSearchText] = useState('');
  const [sortMethod, setSortMethod] = useState('A-Z');

  const loadInventoryItems = async (id = userId) => {
    try {
      const data = await fetchInventory(id);
      console.log(data);
      setInventory(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading inventory items: ', error);
    }
  };

  const loadUserName = async (id) => {
    try {
      const data = await fetchUserData(id);
      console.log(data);
      setParamUserName(data.username);
    } catch (error) {
      console.error('Error loading username: ', error);
    }
  };

  async function handleChangeQuantity(itemId, newQuantity) {
    try {
      const response = await changeInventoryItem(userId, itemId, {
        newQuantity,
      });
      console.log('Quantity change successful: ', response);
      await loadInventoryItems();
    } catch (error) {
      console.error('Error changing quantity: ', error);
    }
  }

  const handleEquipUnequip = async (itemId) => {
    try {
      const response = await toggleEquipped(userId, itemId);
      console.log('Equip/Unequip successful: ', response);
      await loadInventoryItems();
    } catch (error) {
      console.error('Error toggling equipped/unequipped: ', error);
    }
  };

  async function handleDeleteInventoryItem(itemId) {
    try {
      const response = await deleteInventoryItem(userId, itemId);
      console.log('Delete inventory item successful', response);
      await loadInventoryItems();
    } catch (error) {
      console.error('Error deleting inventory item: ', error);
    }
  }

  useEffect(() => {
    if (paramUserId) {
      loadInventoryItems(paramUserId);
      loadUserName(paramUserId);
    } else loadInventoryItems();
  }, [paramUserId, readOnly]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };

  return (
    <main className="inventory-page">
      <h1>{`${paramUserId ? paramUserName : 'Your'} Inventory`}</h1>
      {isLoggedIn ? (
        <>
          <h2>{`${paramUserId ? paramUserName : 'Your'} Items`}</h2>
          <SearchSortControls
            handleSearchChange={handleSearchChange}
            handleSortChange={handleSortChange}
          />
          <div className="">
            {loading ? (
              <Loading />
            ) : (
              <ul className="inventoryItem-list">
                {sortArrayOfItems(inventory, sortMethod, true).map(
                  (inventoryItem) => {
                    if (
                      searchText.length > 0 &&
                      !inventoryItem.item.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    )
                      return; // This item does NOT match search criteria

                    return (
                      <li
                        key={inventoryItem.item._id}
                        className="inventoryItem"
                      >
                        <Link to={`/catalog/item/${inventoryItem.item._id}`}>
                          {inventoryItem.item.name}
                        </Link>
                        <div className="quantity">
                          {!readOnly && (
                            <button
                              type="button"
                              className="minus"
                              onClick={() =>
                                handleChangeQuantity(
                                  inventoryItem.item._id,
                                  inventoryItem.quantity - 1,
                                )
                              }
                            >
                              -
                            </button>
                          )}
                          <p>{inventoryItem.quantity}</p>
                          {!readOnly && (
                            <button
                              type="button"
                              className="plus"
                              onClick={() =>
                                handleChangeQuantity(
                                  inventoryItem.item._id,
                                  inventoryItem.quantity + 1,
                                )
                              }
                            >
                              +
                            </button>
                          )}
                          {inventoryItem.item.equippable && (
                            <Equipped
                              readOnly={readOnly}
                              equipped={inventoryItem.equipped}
                              itemId={inventoryItem.item._id}
                              onClick={handleEquipUnequip}
                            />
                          )}
                          {!readOnly && (
                            <button
                              type="button"
                              className="delete"
                              onClick={() =>
                                handleDeleteInventoryItem(
                                  inventoryItem.item._id,
                                )
                              }
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </li>
                    );
                  },
                )}
              </ul>
            )}
          </div>
        </>
      ) : (
        <NotLoggedIn />
      )}
    </main>
  );
};

const Equipped = (props) => {
  const { readOnly, equipped, itemId, onClick } = props;

  return (
    <div>
      {readOnly ? (
        <div>{equipped ? <p>Equipped</p> : <p>Not equipped</p>}</div>
      ) : (
        <button
          type="button"
          className="equip-btn"
          onClick={() => onClick(itemId)}
        >
          {equipped ? 'Unequip' : 'Equip'}
        </button>
      )}
    </div>
  );
};

// recently added items
// Net worth
// Most valuable items
// Equipped items

export default Inventory;
