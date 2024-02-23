import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { fetchItem, updateItem, fetchCategories } from '../apiClient';
import NotLoggedIn from '../components/NotLoggedIn';
import Loading from '../components/Loading';
import ItemForm from '../components/ItemForm';
import Errors from '../components/Errors';

const UpdateItem = (props) => {
  const { userId, isLoggedIn } = useAuth();
  const { itemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const getItemDetail = async (id) => {
    try {
      const data = await fetchItem(id);
      setItem(data);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const getCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error getting categories: ', error);
    }
  };

  useEffect(() => {
    getItemDetail(itemId);
    getCategories();
    setLoading(false);
  }, [itemId]);

  const onSubmit = async (itemData) => {
    try {
      const response = await updateItem(itemId, itemData);
      console.log('Update Item successful: ', response);
      // getItemDetail(itemId);
      navigate(
        itemId ? `/catalog/item/${itemId}` : response.url ? response.url : '/',
      );
    } catch (error) {
      console.error('Error Updating Item', error);
      setErrors(error.map((err) => err.msg));
    }
  };

  return (
    <main>
      <h1>Update Item</h1>
      {loading ? (
        <Loading />
      ) : (
        <ItemForm
          onSubmit={onSubmit}
          initialData={item}
          categories={categories}
        />
      )}
      {errors.length > 0 && <Errors errors={errors} />}
    </main>
  );
};

export default UpdateItem;
