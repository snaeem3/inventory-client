import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Paper,
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
import AuthButtons from '../components/AuthButtons';

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
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'column' },
            alignItems: 'center',
            gap: 2,
          }}
        >
          <ConstructionIcon sx={{ fontSize: { xs: 48, md: 192 } }} />
          <Typography variant="subtitle1">Create Items</Typography>
        </Paper>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'column' },
            alignItems: 'center',
            gap: 2,
          }}
        >
          <BackpackIcon sx={{ fontSize: { xs: 48, md: 192 } }} />
          <Typography variant="subtitle1">Manage your inventory</Typography>
        </Paper>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'column' },
            alignItems: 'center',
            gap: 2,
          }}
        >
          <CurrencyExchangeIcon sx={{ fontSize: { xs: 48, md: 192 } }} />
          <Typography variant="subtitle1">Track your gold</Typography>
        </Paper>
      </Stack>
      <Typography
        variant="h5"
        textAlign="center"
        color="text.secondary"
        sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' }, p: 1 }}
      >
        Create, edit, and track your D&D items, inventory, and gold. Share your
        custom items with your friends and players around the world.
      </Typography>
      <AuthButtons />
    </Container>
  </Box>
);

export default HomePage;
