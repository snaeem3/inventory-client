import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Stack,
  Grid,
  Paper,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import GppBadIcon from '@mui/icons-material/GppBad';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { addItemToInventory, fetchItem, deleteItem } from '../apiClient';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/Loading';
import Errors from '../components/Errors';
import formatDate from '../utils/formatDate';

const ItemDetail = (props) => {
  const { itemId } = useParams();
  const { userId, isAdmin } = useAuth();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [addItemResponse, setAddItemResponse] = useState(''); // '' | 'loading' | 'success' | 'error'
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getItemDetail = async () => {
      try {
        const data = await fetchItem(itemId);
        setItem(data);
      } catch (error) {
        console.error('Error fetching items: ', error);
      } finally {
        setLoading(false);
      }
    };
    getItemDetail();
  }, [itemId]);

  const handleAddItemToInventory = async (e) => {
    e.preventDefault(); // prevent refresh
    setAddItemResponse('loading');
    try {
      const response = await addItemToInventory(userId, itemId);
      console.log('Add Item to Inventory successful', response);
      setAddItemResponse('success');
      setErrors([]);
    } catch (error) {
      console.error('Error adding item to inventory', error);
      setAddItemResponse('error');
      setErrors(error.response.data.errors.map((err) => err.message));
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteItem(itemId);
      console.log('Delete Item Successful', response);
      navigate('/catalog');
    } catch (error) {
      console.error('Error deleting item', error);
      setErrors(error.map((err) => err.message));
    }
  };

  return (
    <Container component="main">
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Loading />
        </Box>
      ) : (
        <Stack spacing={2}>
          <Typography
            variant="h2"
            sx={{ wordWrap: 'break-word' }}
          >{`${item.name}`}</Typography>
          <Grid
            container
            direction={{ xs: 'column', md: 'row-reverse' }}
            justifyContent="center"
            alignItems="center"
          >
            {item.picture && (
              <Grid
                item
                xs={12}
                md={6}
                sx={{ width: '50%', overflow: 'hidden' }}
              >
                <Paper
                  sx={{ width: '100%', height: '100%', overflow: 'hidden' }}
                >
                  <img
                    src={item.picture}
                    className="item-img"
                    alt="item"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Paper>
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>Description</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{item.description}</Typography>
                  </AccordionDetails>
                </Accordion>
                <Box>
                  <Typography variant="h5">Categories:</Typography>
                  <Grid container sx={{ justifyContent: 'center' }} spacing={1}>
                    {item.category.map((itemCategory) => (
                      <Grid item key={itemCategory._id}>
                        <Chip label={itemCategory.name} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <Stack
                  direction="row"
                  justifyContent="center"
                  gap={2}
                  alignItems="center"
                  className="rarity"
                >
                  <Typography variant="h5">Rarity:</Typography>{' '}
                  <Typography className={item.rarity}>{item.rarity}</Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  gap={2}
                  alignItems="center"
                  className="rarity"
                >
                  <Typography variant="h5">Value: </Typography>
                  <Typography variant="body1">{item.value}</Typography>
                </Stack>
                {item.equippable && (
                  <Chip
                    label="Equippable"
                    color="success"
                    icon={<AddModeratorIcon />}
                    sx={{ width: 'fit-content', alignSelf: 'center' }}
                  />
                )}
                {item.creator && item.creator.username && (
                  <Typography>
                    Created by: {item.creator.username}{' '}
                    {item.createdAt && `on ${formatDate(item.createdAt)}`}
                  </Typography>
                )}
              </Stack>
              <div className="add-to-inventory">
                <Button
                  type="button"
                  onClick={handleAddItemToInventory}
                  startIcon={<LibraryAddIcon />}
                  size="large"
                  variant="contained"
                  sx={{ my: 2 }}
                >
                  Add to Inventory
                </Button>
                {addItemResponse !== '' && (
                  <AddItemResponse result={addItemResponse} />
                )}
              </div>
              {(isAdmin || item.creator?._id === userId) && (
                <>
                  <Link to={`/catalog/item/${itemId}/update`}>
                    <Button
                      type="button"
                      startIcon={<EditIcon />}
                      className="edit-btn"
                    >
                      Edit Item
                    </Button>
                  </Link>
                  <Button
                    type="button"
                    className="delete-btn"
                    onClick={handleDelete}
                    startIcon={<DeleteForeverIcon />}
                    color="error"
                  >
                    Delete Item
                  </Button>

                  <Dialog
                    className="confirmation-modal"
                    open={showDeleteConfirmation}
                  >
                    <DialogTitle>
                      Are you sure you want to delete this item?
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        This action can not be undone
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button type="button" onClick={confirmDelete}>
                        Yes
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setShowDeleteConfirmation(false)}
                      >
                        No
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              )}
            </Grid>
          </Grid>
        </Stack>
      )}
      {errors.length > 0 && <Errors errors={errors} />}
      <Typography sx={{ my: 1, py: 1 }}>
        <Link to="/catalog">Return to Catalog</Link>
      </Typography>
    </Container>
  );
};

/**
 * Component for displaying the response after adding an item to inventory.
 * @param {Object} props - The component props.
 * @param {string} [props.result='loading'] - The result of the add item operation. Possible values are:
 *   - 'loading': Indicates that the operation is in progress.
 *   - 'success': Indicates that the operation was successful.
 *   - Any other string: Indicates that an error occurred during the operation.
 * @param {string} [props.link='/inventory'] - The link to redirect to after a successful operation.
 * @returns {JSX.Element} The rendered response message.
 */
const AddItemResponse = ({ result = 'loading', link = '/inventory' }) => {
  switch (result) {
    case 'loading': {
      return <Loading />;
    }
    case 'success': {
      return (
        <Alert
          severity="success"
          icon={<LibraryAddCheckIcon fontSize="inherit" />}
        >
          Item Added: <Link to={link}>View in Inventory</Link>
        </Alert>
      );
    }
    default: {
      return <Alert severity="error">Error adding to inventory</Alert>;
    }
  }
};

export default ItemDetail;
