import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>{`${item.name}`}</h1>
          {item.picture && (
            <img src={item.picture} className="item-img" alt="item" />
          )}
          <div>
            <p>Description: {item.description}</p>
            <p className="rarity">
              Rarity: <span className={item.rarity}>{item.rarity}</span>
            </p>
            <div>
              Categories:
              <ul>
                {item.category.map((itemCategory) => (
                  <li key={itemCategory._id}>{itemCategory.name}</li>
                ))}
              </ul>
            </div>
            <p>Value: {item.value}</p>
            <p>Equippable: {item.equippable ? '✅' : '❌'}</p>
            {item.creator && item.creator.username && (
              <p>
                Created by: {item.creator.username}{' '}
                {item.createdAt && `on ${formatDate(item.createdAt)}`}
              </p>
            )}
          </div>
          <div className="add-to-inventory">
            <button type="button" onClick={handleAddItemToInventory}>
              Add to Inventory
            </button>
            {addItemResponse !== '' && (
              <AddItemResponse result={addItemResponse} />
            )}
          </div>
          {(isAdmin || item.creator?._id === userId) && (
            <>
              <Link to={`/catalog/item/${itemId}/update`}>
                <button type="button" className="edit-btn">
                  Edit Item
                </button>
              </Link>
              <button
                type="button"
                className="delete-btn"
                onClick={handleDelete}
              >
                Delete Item
              </button>
              {showDeleteConfirmation && (
                <div className="confirmation-modal">
                  <p>Are you sure you want to delete this item?</p>
                  <button type="button" onClick={confirmDelete}>
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirmation(false)}
                  >
                    No
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
      {errors.length > 0 && <Errors errors={errors} />}
      <Link to="/catalog">Return to Catalog</Link>
    </div>
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
        <p>
          Item Added: <Link to={link}>View in Inventory</Link>
        </p>
      );
    }
    default: {
      return <p>Error adding to inventory</p>;
    }
  }
};

export default ItemDetail;
