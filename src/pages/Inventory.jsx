import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Grid,
  Stack,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Collapse,
  ToggleButton,
  ToggleButtonGroup,
  Icon,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ShieldIcon from '@mui/icons-material/Shield';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import GppGoodIcon from '@mui/icons-material/GppGood';
import GppBadIcon from '@mui/icons-material/GppBad';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/Loading';
import NotLoggedIn from '../components/NotLoggedIn';
import {
  fetchInventory,
  changeInventoryItem,
  toggleEquipped,
  deleteInventoryItem,
  fetchUserData,
  fetchCategories,
} from '../apiClient';
import SearchSortControls from '../components/SearchSortControls';
import sortArrayOfItems from '../utils/sortArrayOfItems';
import ExpandMore from '../components/ExpandMore';

const Inventory = (props) => {
  const { readOnly } = props;
  const { userId: paramUserId } = useParams();
  const { userId, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState([]);
  const [paramUserName, setParamUserName] = useState(paramUserId);
  const [searchText, setSearchText] = useState('');
  const [sortMethod, setSortMethod] = useState('A-Z');
  const [allCategories, setAllCategories] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);

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

  const getCategories = async () => {
    try {
      const data = await fetchCategories();
      console.log(data);
      setAllCategories(data);
    } catch (error) {
      console.error('Error getting categories: ', error);
    }
  };

  const handleChangeQuantity = async (itemId, newQuantity) => {
    try {
      const response = await changeInventoryItem(userId, itemId, {
        newQuantity,
      });
      console.log('Quantity change successful: ', response);
      await loadInventoryItems();
    } catch (error) {
      console.error('Error changing quantity: ', error);
    }
  };

  const handleEquipUnequip = async (itemId) => {
    try {
      const response = await toggleEquipped(userId, itemId);
      console.log('Equip/Unequip successful: ', response);
      await loadInventoryItems();
    } catch (error) {
      console.error('Error toggling equipped/unequipped: ', error);
    }
  };

  const handleDeleteInventoryItem = async (itemId) => {
    try {
      const response = await deleteInventoryItem(userId, itemId);
      console.log('Delete inventory item successful', response);
      await loadInventoryItems();
    } catch (error) {
      console.error('Error deleting inventory item: ', error);
    }
  };

  const handleCategoryChange = (newActiveCategories) => {
    setActiveCategories(newActiveCategories);
  };

  useEffect(() => {
    if (paramUserId) {
      loadInventoryItems(paramUserId);
      loadUserName(paramUserId);
    } else loadInventoryItems();
    getCategories();
  }, [paramUserId, readOnly]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };

  return (
    <Container component="main" className="inventory-page">
      <Typography
        variant="h2"
        sx={{ py: 2 }}
      >{`${paramUserId ? paramUserName : 'Your'} Inventory`}</Typography>
      {isLoggedIn ? (
        <Stack>
          {/* <Typography variant="h3">{`${paramUserId ? paramUserName : 'Your'} Items`}</Typography> */}
          <SearchSortControls
            handleSearchChange={handleSearchChange}
            handleSortChange={handleSortChange}
            handleCategoryChange={handleCategoryChange}
            categories={allCategories}
          />
          {loading ? (
            <Loading />
          ) : (
            <Stack spacing={1} className="inventoryItem-list" my={1}>
              {sortArrayOfItems(inventory, sortMethod, true).map(
                (inventoryItem) => {
                  if (
                    searchText.length > 0 &&
                    !inventoryItem.item.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
                    return; // This item does NOT match search criteria

                  if (
                    activeCategories.length > 0 &&
                    !activeCategories.every((activeCategoryId) =>
                      inventoryItem.item.category
                        // .map((cat) => cat._id) // map not needed, because category is NOT populated
                        .includes(activeCategoryId),
                    )
                  )
                    return; // This item does NOT contain ALL active categories

                  return (
                    <InventoryItem
                      key={inventoryItem.item._id}
                      readOnly={readOnly}
                      item={inventoryItem.item}
                      quantity={inventoryItem.quantity}
                      equipped={
                        inventoryItem.item.equippable && inventoryItem.equipped
                      }
                      handleChangeQuantity={handleChangeQuantity}
                      handleDelete={handleDeleteInventoryItem}
                      handleEquipUnequip={handleEquipUnequip}
                    />
                  );
                },
              )}
            </Stack>
          )}
        </Stack>
      ) : (
        <NotLoggedIn />
      )}
    </Container>
  );
};

const InventoryItem = (props) => {
  const {
    readOnly,
    item,
    quantity,
    equipped,
    handleChangeQuantity,
    handleDelete,
    handleEquipUnequip,
  } = props;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <Grid container alignItems={{ xs: 'flex-start', md: 'center' }}>
        <Grid item xs={2} alignContent="center">
          <Tooltip title="View Item Detail">
            <Link
              to={`/catalog/item/${item._id}`}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {item.picture ? (
                <CardMedia
                  component="img"
                  image={item.picture}
                  alt={item.name}
                  sx={{ width: '64px', height: '64px', borderRadius: 2 }}
                />
              ) : (
                <HelpCenterOutlinedIcon sx={{ fontSize: '64px' }} />
              )}
            </Link>
          </Tooltip>
        </Grid>
        <Grid item xs={6} md={8}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Typography>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </Collapse>
          </CardContent>
        </Grid>
        <Grid item xs={4} md={2}>
          <CardActions sx={{ flexDirection: 'column', m: 0 }}>
            <Grid container>
              <Grid item xs={12}>
                {item.equippable ? (
                  <Equipped
                    readOnly={readOnly}
                    equipped={equipped}
                    itemId={item._id}
                    onClick={handleEquipUnequip}
                  />
                ) : (
                  <Icon />
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  flexGrow: 1,
                }}
                className="quantity"
              >
                {!readOnly && (
                  <IconButton
                    type="button"
                    className="minus"
                    onClick={() => handleChangeQuantity(item._id, quantity - 1)}
                  >
                    <RemoveCircleIcon />
                  </IconButton>
                )}
                <Tooltip title="Quantity">
                  <Typography>{quantity}</Typography>
                </Tooltip>
                {!readOnly && (
                  <IconButton
                    type="button"
                    className="plus"
                    onClick={() => handleChangeQuantity(item._id, quantity + 1)}
                  >
                    <AddCircleIcon />
                  </IconButton>
                )}
              </Grid>
              {!readOnly && (
                <Grid item xs={12}>
                  <Tooltip title="Delete from Inventory">
                    <IconButton
                      type="button"
                      className="delete"
                      onClick={() => handleDelete(item._id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              )}
            </Grid>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

const Equipped = (props) => {
  const { readOnly, equipped, itemId, onClick } = props;
  const [isHovered, setIsHovered] = useState(false);

  if (readOnly) {
    return (
      <Tooltip title={equipped ? 'Equipped' : 'Unequipped'}>
        {equipped ? <GppGoodIcon color="success" /> : <GppBadIcon color="" />}
      </Tooltip>
    );
  }

  return (
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
  );
};

// recently added items
// Net worth
// Most valuable items
// Equipped items

export default Inventory;
