import axios from 'axios';
import config from './config';

const api = axios.create({
  baseURL: config.baseURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

// Request interceptor to set the Authorization header
api.interceptors.request.use(
  (configuration) => {
    const token = localStorage.getItem('token');
    if (token) {
      configuration.headers.Authorization = `Bearer ${token}`;
    }
    return configuration;
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

    console.log('Log in successful: ', response.data);
    return response.data;
  } catch (error) {
    // Handle errors, e.g., display an error message
    console.error('Error during login: ', error.response.data);
    throw error;
  }
};

const handleGuestLogin = async () => {
  const guestUserName = 'Guest';
  const guestPassword = 'GuestPassword';
  const guestFormData = { username: guestUserName, password: guestPassword };
  try {
    const response = await handleLogin(guestFormData);
    console.log('Guest Log in successful: ', response);
    return response;
  } catch (error) {
    console.error('Error logging in as guest: ', error.response.data);
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

const fetchUsers = async () => {
  try {
    const response = await api.get(`/users`);
    console.log(`Fetch users successful: `, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user data`);
    throw error;
  }
};

const fetchUserData = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    console.log(`Fetch user data successful: `, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${userId} data`);
    throw error;
  }
};

const updateUserAvatar = async (userId, formData) => {
  try {
    const response = await api.put(`/users/${userId}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(`Update user avatar successful: `, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${userId} avatar`);
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

const createItem = async (itemData, itemPictureFormData) => {
  try {
    console.log(itemData);
    const response = await api.post(`/catalog/item`, {
      name: itemData.name,
      description: itemData.description,
      category: itemData.category,
      value: itemData.value,
      equippable: itemData.equippable,
      private: itemData.private,
    });
    console.log(`Create Item successful: `, response.data);

    // Seperately handle item picture
    if (itemPictureFormData) {
      try {
        const pictureResponse = await updateItemPicture(
          response.data.item._id,
          itemPictureFormData,
        );
        console.log('Item picture update successful: ', pictureResponse);
        response.data.pictureResponse = pictureResponse;
        return response.data;
      } catch (error) {
        console.error('Error updating item picture');
        throw error;
      }
    }

    return response.data;
  } catch (error) {
    let errorMessage = 'An error occurred while creating item.';
    console.log(error.response.data.errors);
    if (error.response && error.response.data && error.response.data.errors) {
      errorMessage = error.response.data.errors
        .map((errorObj) => errorObj.msg)
        .join(', ');
    }
    console.error(`Error creating item: `, errorMessage.toString());
    // throw new Error(error.response.data.errors);
    throw error.response.data.errors;
  }
};

const updateItem = async (itemId, itemData) => {
  try {
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

const updateItemPicture = async (itemId, formData) => {
  try {
    const response = await api.put(
      `/catalog/item/${itemId}/picture`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log(`Update item picture successful: `, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating item ${itemId} picture`);
    throw error;
  }
};

const deleteItem = async (itemId) => {
  try {
    const response = await api.delete(`/catalog/item/${itemId}`);
    console.log(`Delete Item successful: `, response.data);
    return response.data;
  } catch (error) {
    let errorMessage = 'An error occurred while deleting item.';
    console.log(error.response.data);
    if (error.response && error.response.data && error.response.data.errors) {
      errorMessage = error.response.data.errors
        .map((errorObj) => errorObj.msg)
        .join(', ');
    }
    console.error(`Error deleting item: `, errorMessage.toString());
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

const toggleEquipped = async (userId, itemId) => {
  try {
    const response = await api.put(
      `/users/${userId}/inventory/${itemId}/equip-toggle`,
    );
    console.log('Toggle equippable item successful');
    return response.data;
  } catch (error) {
    console.error(`Error toggling item: `, error);
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

const fetchGold = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/gold`);
    console.log(`Fetch Gold successful: `, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching gold: `, error.response.data);
    throw error;
  }
};

const quickEditGold = async (userId, newQuantity) => {
  try {
    const response = await api.put(`/users/${userId}/gold`, { newQuantity });
    console.log(`Quick Edit Gold successful: `, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error quick editing gold: `, error.response.data);
    throw error;
  }
};

const addTransaction = async (userId, newQuantity, note, date) => {
  try {
    const response = await api.post(`/users/${userId}/gold`, {
      newQuantity,
      note,
      date,
    });
    console.log(`Add gold transaction successful: `, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error adding gold transaction: `, error.response.data);
    throw error;
  }
};

const updateTransaction = async (
  userId,
  transactionId,
  newQuantity,
  note,
  date,
) => {
  try {
    const response = await api.put(`/users/${userId}/gold/${transactionId}`, {
      newQuantity,
      note,
      date,
    });
    console.log(`Update gold transaction successful: `, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating gold transaction: `, error.response.data);
    throw error;
  }
};

const deleteTransaction = async (userId, transactionId) => {
  console.log('transactionId: ', transactionId);
  try {
    const response = await api.delete(`/users/${userId}/gold/${transactionId}`);
    console.log(`Delete gold transaction successful: `, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error deleting gold transaction: `, error.response.data);
    throw error;
  }
};

export {
  handleSignUp,
  handleLogin,
  handleGuestLogin,
  handleLogout,
  fetchUsers,
  fetchUserData,
  updateUserAvatar,
  fetchItems,
  fetchItem,
  createItem,
  updateItem,
  updateItemPicture,
  deleteItem,
  fetchCategories,
  fetchInventory,
  addItemToInventory,
  // updateInventory,
  changeInventoryItem,
  toggleEquipped,
  deleteInventoryItem,
  fetchGold,
  quickEditGold,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
