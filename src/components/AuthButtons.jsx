import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Grid, Button } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import Errors from './Errors';

const AuthButtons = ({
  loginLink = '/log-in',
  signupLink = '/sign-up',
  //   handleGuestLoginSubmit,
}) => {
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
    <Container maxWidth="sm">
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={4}>
          <Link to={loginLink}>
            <Button color="primary" size="large" fullWidth>
              Log In
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Link to={signupLink}>
            <Button variant="contained" color="primary" size="large" fullWidth>
              Sign Up
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={handleGuestLoginSubmit}
            fullWidth
          >
            Guest Log In
          </Button>
        </Grid>
        {errors && (
          <Grid item xs={12}>
            <Errors errors={errors} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default AuthButtons;
