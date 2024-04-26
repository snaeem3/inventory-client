import { Container, Stack, Typography } from '@mui/material';
import AuthButtons from './AuthButtons';

const NotLoggedIn = (props) => (
  <Container component="main" maxWidth="sm" sx={{ py: 2 }}>
    <Stack spacing={2}>
      <Typography variant="h3">
        You must be logged in to view this page
      </Typography>
      <AuthButtons />
    </Stack>
  </Container>
);

export default NotLoggedIn;
