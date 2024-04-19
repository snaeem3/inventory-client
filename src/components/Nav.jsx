import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Home from '@mui/icons-material/Home';
import { useAuth } from '../hooks/useAuth';

const Nav = (props) => {
  const { user, isLoggedIn, isAdmin, logout, profilePictureURL } = useAuth();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
      setSnackBarOpen(true);
    } catch (error) {
      console.error('Error logging out');
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  };

  return (
    <AppBar position="static" sx={{ marginTop: { xs: 0, md: 1 } }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              // className="main-links"
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link to="/">
                <MenuItem>Home</MenuItem>
              </Link>
              <MenuItem>
                <Link to="/catalog">Item Catalog</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/users">Users</Link>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to="/">
              <IconButton
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Home />
              </IconButton>
            </Link>
            <Link to="/catalog">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Item Catalog
              </Button>
            </Link>
            <Link to="/users">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Users
              </Button>
            </Link>
          </Box>
          <Box
            textAlign="center"
            align="center"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                }}
              >
                D&D Inventory Manager
              </Typography>
            </Link>
          </Box>

          {isLoggedIn && (
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Link to="/inventory">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Inventory
                </Button>
              </Link>
              <Link to="/gold">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Gold
                </Button>
              </Link>
            </Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Your links">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user} src={profilePictureURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn ? (
                <div>
                  <MenuItem onClick={handleLogoutClick}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                  <Link to="/settings">
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Settings</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/inventory">
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Inventory</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/gold">
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Gold</Typography>
                    </MenuItem>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link to="/log-in">
                    <MenuItem onClick={handleCloseUserMenu}>Log In</MenuItem>
                  </Link>
                  <Link to="/sign-up">
                    <MenuItem onClick={handleCloseUserMenu}>Sign Up</MenuItem>
                  </Link>
                </div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
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
          Logout successful!
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default Nav;
