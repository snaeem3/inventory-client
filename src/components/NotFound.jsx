import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const NotFound = (props) => {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const theme = useTheme();

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <Typography variant="h2" gutterBottom>
        <Typography
          variant="h1"
          component="span"
          color={theme.palette.primary.main}
        >
          404{' '}
        </Typography>
        Page Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        The requested page could not be found.
      </Typography>
      <Link to="/" color="primary" variant="body1">
        <Typography variant="body1">Return Home</Typography>
      </Link>
    </div>
  );
};

export default NotFound;
