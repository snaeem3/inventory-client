import React from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ text = 'Loading' }) => (
  <Box
    sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
    className="loading"
  >
    <CircularProgress color="secondary" />
    <Typography variant="h4" className="loading-text">
      {text}
    </Typography>
  </Box>
);

export default Loading;
