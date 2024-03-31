import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Box,
  Grid,
  Stack,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ShieldIcon from '@mui/icons-material/Shield';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import DeleteIcon from '@mui/icons-material/Delete';
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
    <Container component="main" className="inventory-page">
      <Typography variant="h2">{`${paramUserId ? paramUserName : 'Your'} Inventory`}</Typography>
      {isLoggedIn ? (
        <>
          <Typography variant="h3">{`${paramUserId ? paramUserName : 'Your'} Items`}</Typography>
          <SearchSortControls
            handleSearchChange={handleSearchChange}
            handleSortChange={handleSortChange}
          />
          <div className="">
            {loading ? (
              <Loading />
            ) : (
              <Stack className="inventoryItem-list">
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
                            <IconButton
                              type="button"
                              className="minus"
                              onClick={() =>
                                handleChangeQuantity(
                                  inventoryItem.item._id,
                                  inventoryItem.quantity - 1,
                                )
                              }
                            >
                              <RemoveCircleIcon />
                            </IconButton>
                          )}
                          <p>{inventoryItem.quantity}</p>
                          {!readOnly && (
                            <IconButton
                              type="button"
                              className="plus"
                              onClick={() =>
                                handleChangeQuantity(
                                  inventoryItem.item._id,
                                  inventoryItem.quantity + 1,
                                )
                              }
                            >
                              <AddCircleIcon />
                            </IconButton>
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
              </Stack>
            )}
          </div>
        </>
      ) : (
        <NotLoggedIn />
      )}
    </Container>
  );
};

const Equipped = (props) => {
  const { readOnly, equipped, itemId, onClick } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      {readOnly ? (
        <div>
          {equipped ? (
            <Typography>Equipped</Typography>
          ) : (
            <Typography>Not equipped</Typography>
          )}
        </div>
      ) : (
        <IconButton
          type="button"
          className="equip-btn"
          onClick={() => onClick(itemId)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {equipped ? (
            <Tooltip title="Un-equip">
              {isHovered ? (
                <RemoveModeratorIcon color="error" />
              ) : (
                <ShieldIcon color="success" />
              )}
            </Tooltip>
          ) : (
            <Tooltip title="Equip">
              {isHovered ? (
                <AddModeratorIcon color="success" />
              ) : (
                <ShieldIcon color="" />
              )}
            </Tooltip>
          )}
        </IconButton>
      )}
    </div>
  );
};

// recently added items
// Net worth
// Most valuable items
// Equipped items

export default Inventory;
