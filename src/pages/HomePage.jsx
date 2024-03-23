import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Paper,
  Button,
} from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import BackpackIcon from '@mui/icons-material/Backpack';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useAuth } from '../hooks/useAuth';
import { fetchUserData } from '../apiClient';
import NotLoggedIn from '../components/NotLoggedIn';
import UserOverview from '../components/UserOverview';

const styles = {
  largeIcon: {
    width: 60,
    height: 60,
  },
};

const HomePage = (props) => {
  const { user: userName, userId, isLoggedIn, isAdmin } = useAuth();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

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
    if (isLoggedIn) loadUserData(userId);
    setLoading(false);
  }, [userId, isLoggedIn]);

  return (
    <Container component="main" className="home-page">
      {isLoggedIn ? (
        <>
          <h1>D&D Inventory Management</h1>
          <h2 className="welcome-back">Welcome Back {userName}</h2>
          <UserOverview
            name={userName}
            inventoryItems={user.itemInventory}
            gold={user.gold?.quantity}
            netWorth={user.netWorth}
          />
          <div className="links">
            <Link to="/inventory">
              <button type="button">View your Inventory</button>
            </Link>
            <Link to="/gold">
              <button type="button">View your Gold</button>
            </Link>
            <Link to="/catalog">
              <button type="button">View the Item Catalog</button>
            </Link>
          </div>
        </>
      ) : (
        <Hero />
      )}
    </Container>
  );
};

const Hero = (props) => (
  <Box
    id="hero"
    sx={(theme) => ({
      width: '100%',
    })}
  >
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: { xs: 4, sm: 8 },
        pb: { xs: 8, sm: 12 },
        gap: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 'clamp(3.5rem, 10vw, 4rem)',
        }}
      >
        Inventory Management.&nbsp;
        <Typography
          component="span"
          variant="h1"
          sx={{
            fontSize: 'clamp(3rem, 10vw, 4rem)',
            color: 'primary.main',
          }}
        >
          Solved.
        </Typography>
      </Typography>
      <Stack direction="row" spacing={3}>
        <Paper elevation="2" sx={{ p: 2 }}>
          <ConstructionIcon sx={{ fontSize: { xs: 48, md: 192 } }} />
          <Typography variant="subtitle1" sx={{ pt: 2 }}>
            Create and Edit items
          </Typography>
        </Paper>
        <Paper elevation="2" sx={{ p: 2 }}>
          <BackpackIcon sx={{ fontSize: { xs: 48, md: 192 } }} />
          <Typography variant="subtitle1" sx={{ pt: 2 }}>
            Manage your inventory
          </Typography>
        </Paper>
        <Paper elevation="2" sx={{ p: 2 }}>
          <CurrencyExchangeIcon sx={{ fontSize: { xs: 48, md: 192 } }} />
          <Typography variant="subtitle1" sx={{ pt: 2 }}>
            Track your gold
          </Typography>
        </Paper>
      </Stack>
      <Typography
        variant="h5"
        textAlign="center"
        color="text.secondary"
        sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' }, p: 1 }}
      >
        Create, edit, and track your D&D items, gold, and personal inventory.
        Share your custom items with your friends and players around the world.
      </Typography>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Link to="/sign-up">
            <Button variant="contained" color="primary" size="large">
              Sign Up
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/log-in">
            <Button variant="outlined" color="primary" size="large">
              Log In
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default HomePage;
