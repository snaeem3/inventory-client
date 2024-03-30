import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { createItem, fetchCategories } from '../apiClient';
import Loading from '../components/Loading';
import ItemForm from '../components/ItemForm';
import Errors from '../components/Errors';

const CreateItem = (props) => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error('Error getting categories: ', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const onSubmit = async (itemData, imageFormData) => {
    console.log('imageFormData: ', imageFormData);
    try {
      const response = await createItem(itemData, imageFormData);
      console.log('Create Item successful: ', response);
      navigate(response.url ? response.url : '/');
    } catch (error) {
      console.error('Error Creating Item', error);
      setErrors(error.map((err) => err.msg || err.message));
    }
  };

  return (
    <Container component="main">
      <Typography variant="h2" sx={{ py: 2 }}>
        Create Item
      </Typography>
      {loading ? (
        <Loading />
      ) : (
        <ItemForm onSubmit={onSubmit} categories={categories} />
      )}
      {errors.length > 0 && <Errors errors={errors} />}
    </Container>
  );
};

export default CreateItem;
