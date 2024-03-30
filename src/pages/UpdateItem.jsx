import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import {
  fetchItem,
  updateItem,
  updateItemPicture,
  fetchCategories,
} from '../apiClient';
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

  const onSubmit = async (itemData, imageFormData) => {
    try {
      const response = await updateItem(itemId, itemData);
      console.log('Update Item successful: ', response);
      let pictureResponse;
      if (imageFormData)
        pictureResponse = await updateItemPicture(itemId, imageFormData);
      if (pictureResponse)
        console.log('Update Item picture successful: ', pictureResponse);
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
    <Container component="main">
      <Typography variant="h2" sx={{ py: 2 }}>
        Update Item
      </Typography>
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
      <Typography sx={{ my: 1, py: 1 }}>
        <Link to={`/catalog/item/${itemId}`}>Return to Item Detail</Link>
      </Typography>
    </Container>
  );
};

export default UpdateItem;
