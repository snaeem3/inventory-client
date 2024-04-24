import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  InputLabel,
  Input,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from '../hooks/useAuth';
import Errors from '../components/Errors';
import { fetchUserData, updateUserAvatar } from '../apiClient';

const Settings = (props) => {
  const {
    userId,
    isLoggedIn,
    user,
    profilePictureURL,
    updateLocalProfilePictureURL,
  } = useAuth();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userName, setUserName] = useState(user);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const getUserData = async (id) => {
    try {
      const data = await fetchUserData(id);
      console.log('getUserData successful: ', data);
      setUserName(data.username);
    } catch (error) {
      console.error('Error getting user data: ', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setImage(selectedFile);

    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setImagePreview(previewURL);
    } else setImagePreview(null);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    try {
      const response = await updateUserAvatar(userId, formData);
      console.log('updateUserAvatar successful: ', response);
      updateLocalProfilePictureURL(response);
      setSnackBarMessage('Profile updated successfully!');
      setSnackBarOpen(true);
    } catch (error) {
      console.error(`Error updating profile: `, error);
      setErrors(error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  };

  useEffect(() => {
    getUserData(userId);
    setLoading(false);
  }, [userId]);

  return (
    <Container component="main" className="settings" maxWidth="sm">
      <Typography variant="h1" sx={{ py: 2 }}>
        Settings
      </Typography>
      <div className="profile">
        <Typography variant="h2">Profile</Typography>
        <Box
          component="form"
          onSubmit={handleProfileSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
          alignItems="center"
        >
          <InputLabel htmlFor="username">Username: </InputLabel>
          <TextField name="username" disabled value={userName} />
          <InputLabel htmlFor="avatar">Update Profile Photo </InputLabel>
          <Input
            type="file"
            accept="image/*"
            id="avatar"
            onChange={handleFileChange}
          />
          {imagePreview && (
            <Box
              component="img"
              src={imagePreview}
              alt="avatar"
              maxWidth={400}
              height="auto"
              className="img-preview"
            />
          )}
          <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
            Save changes
          </Button>
        </Box>
      </div>
      {errors.length > 0 && <Errors errors={errors} />}
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Settings;
