import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Paper,
  Button,
  Tooltip,
  IconButton,
} from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import BackpackIcon from '@mui/icons-material/Backpack';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PaidIcon from '@mui/icons-material/Paid';
import { useAuth } from '../hooks/useAuth';
import { fetchUserData } from '../apiClient';
import UserOverview from '../components/UserOverview';
import Errors from '../components/Errors';

const styles = {
  largeIcon: {
    width: 60,
    height: 60,
  },
};

const HomePage = (props) => {
  const { user: userName, userId, isLoggedIn, isAdmin, guestLogin } = useAuth();
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
          <Typography variant="h3" sx={{ py: { xs: 2, md: 4 } }}>
            D&D Inventory Management
          </Typography>
          <Typography variant="h4" className="welcome-back" sx={{ pb: 4 }}>
            Welcome Back {userName}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ justifyContent: 'center', py: 2 }}
            className="links"
          >
            <Link to="/inventory">
              <Tooltip title="View your Inventory" arrow placement="top">
                <IconButton
                  aria-label="View your Inventory"
                  sx={{
                    p: 0,
                    ':hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  <BackpackIcon sx={{ fontSize: 180 }} />
                </IconButton>
              </Tooltip>
            </Link>
            <Link to="/gold">
              <Tooltip title="View Gold detail" arrow placement="top">
                <IconButton
                  aria-label="View Gold detail"
                  sx={{
                    p: 0,
                    ':hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  <PaidIcon sx={{ fontSize: 180 }} />
                </IconButton>
              </Tooltip>
            </Link>
            <Link to="/catalog">
              <Tooltip title="View Item Catalog" arrow placement="top">
                <IconButton
                  aria-label="View Item Catalog"
                  sx={{
                    p: 0,
                    ':hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  <MenuBookIcon sx={{ fontSize: 180 }} />
                </IconButton>
              </Tooltip>
            </Link>
          </Stack>
          <UserOverview
            name={userName}
            inventoryItems={user.itemInventory}
            gold={user.gold?.quantity}
            netWorth={user.netWorth}
          />
        </>
      ) : (
        <Hero guestLogin={guestLogin} />
      )}
    </Container>
  );
};

const Hero = (props) => {
  const { guestLogin } = props;
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  const handleGuestLoginSubmit = async (e) => {
    try {
      const response = await guestLogin();
      console.log('Guest Log In successful: ', response);
      setErrors([]);
      navigate('/');
    } catch (error) {
      console.error('Error submitting guest log-in: ', error);
      setErrors(error.response.data.errors || [error.response.data.error]);
    }
  };

  return (
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
          <Paper elevation={2} sx={{ p: 2 }}>
            <ConstructionIcon sx={{ fontSize: { xs: 48, md: 192 } }} />
            <Typography variant="subtitle1" sx={{ pt: 2 }}>
              Create and Edit items
            </Typography>
          </Paper>
          <Paper elevation={2} sx={{ p: 2 }}>
            <BackpackIcon sx={{ fontSize: { xs: 48, md: 192 } }} />
            <Typography variant="subtitle1" sx={{ pt: 2 }}>
              Manage your inventory
            </Typography>
          </Paper>
          <Paper elevation={2} sx={{ p: 2 }}>
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
          Share your custom items with your friends and players around the
          world.
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
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleGuestLoginSubmit}
            >
              Guest Log In
            </Button>
          </Grid>
        </Grid>
        {errors && <Errors errors={errors} />}
      </Container>
    </Box>
  );
};

export default HomePage;
