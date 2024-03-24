import { useState } from 'react';
import { Navigate, useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Avatar,
  CssBaseline,
  Container,
  Typography,
  Box,
  TextField,
  Button,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../hooks/useAuth';
import Errors from '../components/Errors';

const Login = (props) => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <LogInForm />
        <Typography variant="body1" sx={{ p: 1 }}>
          <Link to="/sign-up">Don't have an account? Sign Up</Link>
        </Typography>
      </Box>
    </Container>
  );
};

const LogInForm = (props) => {
  const location = useLocation();
  const username = location?.state?.username; // if user just signed up
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: username || '',
    password: '',
  });

  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData.username, formData.password);
      console.log('Log in successful', response);
      setErrors([]);

      navigate('/');
    } catch (error) {
      console.error('Error during login:', error.response.data);
      setErrors(error.response.data.error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* <label htmlFor="username">Username</label> */}
      <TextField
        name="username"
        // placeholder="username@email.com"
        label="User name"
        type="text"
        value={formData.username}
        required
        autoFocus={!username}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {/* <label htmlFor="password">Password</label> */}
      <TextField
        name="password"
        type="password"
        required
        label="Password"
        autoFocus={!!username}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>

      {errors && <Errors errors={errors} />}
    </Box>
  );
};

export default Login;
