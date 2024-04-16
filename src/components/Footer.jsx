import React from 'react';
import {
  Container,
  Typography,
  Box,
  Stack,
  IconButton,
  Link,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = (props) => (
  <Container
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: { xs: 4, sm: 8 },
      py: { xs: 8, sm: 8 },
      textAlign: { sm: 'center', md: 'left' },
      marginTop: 'auto', // Keeps footer at bottom of screen (not fixed)
    }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pt: { xs: 4, sm: 8 },
        width: '100%',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography>
        Site by{' '}
        <Link
          color="text.secondary"
          href="https://snaeem3.github.io/portfolio/"
          target="_blank"
        >
          Sameer N.
        </Link>
      </Typography>

      <Stack
        direction="row"
        justifyContent="left"
        spacing={1}
        useFlexGap
        sx={{
          color: 'text.secondary',
        }}
      >
        <IconButton
          color="inherit"
          href="https://github.com/snaeem3"
          target="_blank"
          aria-label="GitHub"
          sx={{ alignSelf: 'center' }}
        >
          <GitHubIcon />
        </IconButton>
      </Stack>
    </Box>
  </Container>
);

export default Footer;
