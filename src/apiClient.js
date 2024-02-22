import axios from 'axios';
import config from './config';

const api = axios.create({
  baseURL: config.baseURL,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

// Request interceptor to set the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const handleSignUp = async (formData) => {
  try {
    const response = await api.post(`/auth/sign-up`, formData);

    // Handle the response, e.g., redirect or show a success message
    console.log(response.data);
    handleLogin(formData);
    return response.data;
  } catch (error) {
    // Handle errors, e.g., display an error message
    console.error('Error during registration:', error.response.data);
    // return error.response.data.errors;
    throw error;
  }
};

const handleLogin = async (formData) => {
  try {
    const response = await api.post('/auth/log-in', formData);

    console.log('Log in successful', response.data);
    return response.data;
  } catch (error) {
    // Handle errors, e.g., display an error message
    console.error('Error during login:', error.response.data);
    throw error;
  }
};

const handleLogout = async () => {
  try {
    const response = await api.get('/auth/log-out');

    console.log('Log out successful', response.data);
  } catch (error) {
    console.error('Error during logout: ', error.response.data);
    throw error;
  }
};

const fetchItems = async () => {
  try {
    const response = await api.get(`/catalog/items`);
    console.log(`Fetch Items successful: `, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching items: `, error.response.data);
    throw error;
  }
};

const fetchItem = async (id) => {
  try {
    const response = await api.get(`/catalog/item/${id}`);
    console.log(`Fetch Item detail successful: `, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching item detail: `, error.response.data);
    throw error;
  }
};

const updateItem = async (itemId, itemData) => {
  try {
    console.log(itemData.category);
    const response = await api.put(`/catalog/item/${itemId}`, {
      name: itemData.name,
      description: itemData.description,
      category: itemData.category,
      value: itemData.value,
      equippable: itemData.equippable,
      private: itemData.private,
    });
    console.log(`Update Item successful: `, response.data);
    return response.data;
  } catch (error) {
    let errorMessage = 'An error occurred while updating item.';
    console.log(error.response.data.errors);
    if (error.response && error.response.data && error.response.data.errors) {
      errorMessage = error.response.data.errors
        .map((errorObj) => errorObj.msg)
        .join(', ');
    }
    console.error(`Error updating item: `, errorMessage.toString());
    // throw new Error(error.response.data.errors);
    throw error.response.data.errors;
  }
};

const fetchCategories = async () => {
  try {
    const response = await api.get(`/catalog/categories`);
    console.log(`Fetch categories successful: `, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching categories: `, error.response.data);
    throw error;
  }
};

const fetchInventory = async (userId) => {
  try {
    const response = await api.get(`users/${userId}/inventory`);
    console.log(`Fetch Inventory successful: `, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching inventory: `, error.response.data);
    throw error;
  }
};

const addItemToInventory = async (userId, itemId, quantity = 1) => {
  try {
    const response = await api.post(`users/${userId}/inventory/add`, {
      itemId,
      quantity,
    });
    console.log('Add item to inventory successful: ', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error adding item to inventory: `, error.response.data);
    throw error;
  }
};

const updateInventory = async (userId, inventory) => {
  try {
    const response = await api.put(`users/${userId}/inventory`, { inventory });
    console.log(`Update inventory successful: `, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating inventory: `, error);
    throw error;
  }
};

const changeInventoryItem = async (
  userId,
  itemId,
  { newQuantity, favorite },
) => {
  try {
    const response = await api.put(`/users/${userId}/inventory/${itemId}`, {
      newQuantity,
      favorite,
    });
    console.log(`Change inventory item successful`);
    return response.data;
  } catch (error) {
    console.error(`Error changing inventory item: `, error);
    throw error;
  }
};

const deleteInventoryItem = async (userId, itemId) => {
  try {
    const response = await api.delete(`/users/${userId}/inventory/${itemId}`);
    console.log(`Delete inventory item successful`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting inventory item: `, error);
    throw error;
  }
};

export {
  handleSignUp,
  handleLogin,
  handleLogout,
  fetchItems,
  fetchItem,
  updateItem,
  fetchCategories,
  fetchInventory,
  addItemToInventory,
  // updateInventory,
  changeInventoryItem,
  deleteInventoryItem,
};
