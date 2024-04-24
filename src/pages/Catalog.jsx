import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Button,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { fetchCategories, fetchItems } from '../apiClient';
import { useAuth } from '../hooks/useAuth';
import sortArrayOfItems from '../utils/sortArrayOfItems';
import SearchSortControls from '../components/SearchSortControls';

const Catalog = (props) => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortMethod, setSortMethod] = useState('A-Z');
  const [allCategories, setAllCategories] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const { isLoggedIn, isAdmin } = useAuth();

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };

  const handleCategoryChange = (newActiveCategories) => {
    setActiveCategories(newActiveCategories);
  };

  useEffect(() => {
    const getCatalogItems = async () => {
      try {
        const data = await fetchItems();
        console.log(data);
        setItems(data);
      } catch (error) {
        console.error('Error: ', error);
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
    getCatalogItems();
    getCategories();
  }, []);

  return (
    <Container component="main" className="catalog" maxWidth="md">
      <Typography variant="h1" sx={{ py: 2 }}>
        Catalog
      </Typography>
      {isLoggedIn && (
        <Link to="/catalog/item/create">
          <Button type="button" startIcon={<AddBoxIcon />} variant="contained">
            Create New Item
          </Button>
        </Link>
      )}
      <Box my={2}>
        <SearchSortControls
          handleSearchChange={handleSearchChange}
          handleSortChange={handleSortChange}
          handleCategoryChange={handleCategoryChange}
          categories={allCategories}
        />
      </Box>
      <Stack spacing={1} className="item-list">
        {sortArrayOfItems(items, sortMethod).map((item) => {
          if (
            searchText.length > 0 &&
            !item.name.toLowerCase().includes(searchText.toLowerCase())
          )
            return; // This item does NOT match search criteria

          if (
            activeCategories.length > 0 &&
            !activeCategories.every((activeCategoryId) =>
              item.category.map((cat) => cat._id).includes(activeCategoryId),
            )
          )
            return; // This item does NOT contain ALL active categories

          return (
            <Card
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                borderRadius: 4,
                border: 'solid 1px lightgray',
              }}
              key={item._id}
            >
              <Grid container alignItems="center" flexWrap="nowrap" gap={1}>
                <Grid item>
                  <Link to={`/catalog/item/${item._id}`}>
                    {item.picture ? (
                      <Box
                        component="img"
                        src={item.picture}
                        alt={item.name}
                        sx={{ width: '64px', height: '64px' }}
                      />
                    ) : (
                      <HelpCenterOutlinedIcon sx={{ fontSize: '64px' }} />
                    )}
                  </Link>
                </Grid>
                <Grid item display="flex" gap={1} alignItems="center">
                  <Typography variant="h6">
                    <Link to={`/catalog/item/${item._id}`}>{item.name}</Link>
                  </Typography>
                  {item.equippable && (
                    <Tooltip title="Equippable">
                      <ShieldOutlinedIcon />
                    </Tooltip>
                  )}
                </Grid>
              </Grid>
              <Stack direction="row" spacing={1} p={1}>
                {item.category.map((category) => (
                  <Chip
                    key={category._id}
                    // icon={icon}
                    label={category.name}
                  />
                ))}
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </Container>
  );
};

export default Catalog;
