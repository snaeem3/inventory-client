import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Box, Typography, Avatar, Button } from '@mui/material';
import BackpackIcon from '@mui/icons-material/Backpack';
import { useAuth } from '../hooks/useAuth';
import { fetchUserData } from '../apiClient';
import Loading from '../components/Loading';
import UserOverview from '../components/UserOverview';

const User = (props) => {
  const { userId: paramUserId } = useParams();
  const { userId, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const loadUserData = async (id) => {
    try {
      const data = await fetchUserData(id);
      setUser(data);
      console.log('loadUserData successful');
    } catch (error) {
      console.error('Error loading User Data: ', error);
      throw error;
    }
  };

  useEffect(() => {
    loadUserData(paramUserId);
  }, [paramUserId]);

  return (
    <Container component="main" className="user-page">
      <Box
        sx={{
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h3">
          {user.username}
        </Typography>
        {user.profilePicture && (
          <Avatar
            src={user.profilePicture}
            alt="avatar"
            sx={{ width: 256, height: 256 }}
          />
        )}
      </Box>
      <div className="user-links">
        <Link to={`/users/${paramUserId}/inventory`}>
          <Button
            type="button"
            size="large"
            startIcon={<BackpackIcon />}
            sx={{ py: 2 }}
          >
            <Typography variant="h5">View Inventory</Typography>
          </Button>
        </Link>
      </div>
      <UserOverview
        name={user.name}
        inventoryItems={user.itemInventory}
        joined={user.createdAt}
        gold={user.gold?.quantity}
        netWorth={user.netWorth}
      />
    </Container>
  );
};

export default User;
