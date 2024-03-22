import { Box, Typography, Alert } from '@mui/material';

const Errors = (props) => {
  const { errors } = props;

  return (
    <Box margin="normal">
      {/* <Typography component="h2">Errors:</Typography> */}
      {/* <ul> */}
      {errors.map((error) => (
        <Alert severity="error">{error}</Alert>
      ))}
      {/* </ul> */}
    </Box>
  );
};

export default Errors;
