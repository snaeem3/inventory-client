import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Stack, Typography, Button } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import Errors from './Errors';

const NotLoggedIn = (props) => {
  const { guestLogin } = useAuth();

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
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.error) {
        setErrors([error.response.data.error]);
      } else {
        setErrors([error]);
      }
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 2 }}>
      <Typography variant="h3">
        You must be logged in to view this page
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ py: 2, my: 1 }}
      >
        <Link to="/log-in">
          <Button type="button" size="large">
            Log In
          </Button>
        </Link>
        <Link to="/sign-up">
          <Button type="button" variant="contained" size="large">
            Sign up
          </Button>
        </Link>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={handleGuestLoginSubmit}
        >
          Guest Log In
        </Button>
      </Stack>
      {errors && <Errors errors={errors} />}
    </Container>
  );
};

export default NotLoggedIn;
