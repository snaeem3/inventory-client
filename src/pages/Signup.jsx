import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  CssBaseline,
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../hooks/useAuth';
import { handleSignUp } from '../apiClient';
import Errors from '../components/Errors';

const Signup = (props) => {
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
          Sign up
        </Typography>
        <SignUpForm />
        <Typography variant="body1" sx={{ p: 1 }}>
          <Link to="/log-in">Already have an account? Log In</Link>
        </Typography>
      </Box>
    </Container>
  );
};

const SignUpForm = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await handleSignUp(formData);

      console.log(response);
      setErrors([]);
    } catch (error) {
      console.error('Error during registration:', error.response.data.errors);
      setErrors(error.response.data.errors.flat().map((err) => err.msg));
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
        required
        autoFocus
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {/* <label htmlFor="password">Password</label> */}
      <TextField
        name="password"
        label="Password"
        type="password"
        required
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {/* <label htmlFor="confirmPassword">Confirm Password</label> */}
      <TextField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        required
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

export default Signup;
