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
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getItemDetail = async () => {
      try {
        const data = await fetchItem(itemId);
        setItem(data);
      } catch (error) {
        console.error('Error: ', error);
      } finally {
        setLoading(false);
      }
    };
    getItemDetail();
  }, [itemId]);

  const handleAddItemToInventory = async (e) => {
    e.preventDefault(); // prevent refresh
    try {
      const response = await addItemToInventory(userId, itemId);
      console.log('POST successful', response);
      setErrors([]);
    } catch (error) {
      console.error('Error adding item to inventory', error);
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
          <button type="button" onClick={handleAddItemToInventory}>
            Add to Inventory
          </button>
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

export default ItemDetail;
