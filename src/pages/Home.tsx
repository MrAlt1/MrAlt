import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../theme';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        p: 3,
        color: 'white',
        animation: 'fadeIn 0.5s ease-in-out',
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          animation: 'slideDown 0.5s ease-in-out',
          animationDelay: '0.1s',
          animationFillMode: 'both',
        }}
      >
        Welcome, {user?.name}!
      </Typography>

      <Paper
        sx={{
          p: 3,
          backgroundColor: colors.background.card,
          animation: 'slideUp 0.5s ease-in-out',
          animationDelay: '0.2s',
          animationFillMode: 'both',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Project Management System
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is your central hub for managing projects, tasks, and team collaboration.
          Use the navigation menu to access different sections of the application.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Home; 