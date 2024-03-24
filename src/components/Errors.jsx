import { Box, Alert } from '@mui/material';

/**
 * Component for displaying a list of errors.
 * @param {Object} props - The component props.
 * @param {string[]|Object[]} props.errors - An array of error messages or error objects.
 * @returns {JSX.Element} The rendered error list component.
 */
const Errors = (props) => {
  const { errors } = props;

  return (
    <Box margin="normal">
      {errors.map((error, idx) => (
        <Alert severity="error" key={idx}>
          {error.message || error}
        </Alert>
      ))}
    </Box>
  );
};

export default Errors;
