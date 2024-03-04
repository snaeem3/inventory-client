import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    } catch (error) {
      console.error(`Error updating profile: `, error);
      setErrors(error);
    }
  };

  useEffect(() => {
    getUserData(userId);
    setLoading(false);
  }, [userId]);

  return (
    <main className="settings">
      <h1>Settings</h1>
      <div className="profile">
        <h2>Profile</h2>
        <form onSubmit={handleProfileSubmit}>
          <label htmlFor="username">Username: </label>
          <p>{userName}</p>
          <label htmlFor="avatar">Update Profile Photo </label>
          <input
            type="file"
            accept="image/*"
            id="avatar"
            onChange={handleFileChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="avatar"
              width={250}
              height={250}
              className="img-preview"
            />
          )}
          <button type="submit">Save changes</button>
        </form>
      </div>
      {errors.length > 0 && <Errors errors={errors} />}
    </main>
  );
};

export default Settings;
