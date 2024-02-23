import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const onSubmit = async (itemData) => {
    try {
      const response = await createItem(itemData);
      console.log('Create Item successful: ', response);
      navigate(response.url ? response.url : '/');
    } catch (error) {
      console.error('Error Creating Item', error);
      setErrors(error.map((err) => err.msg));
    }
  };

  return (
    <main>
      <h1>Create Item</h1>
      {loading ? (
        <Loading />
      ) : (
        <ItemForm onSubmit={onSubmit} categories={categories} />
      )}
      {errors.length > 0 && <Errors errors={errors} />}
    </main>
  );
};

export default CreateItem;
