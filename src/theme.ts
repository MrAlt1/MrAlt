import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#646cff',
    },
    secondary: {
      main: '#4CAF50',
    },
    background: {
      default: '#1e1e1e',
      paper: '#242424',
    },
    text: {
      primary: '#fff',
      secondary: '#888',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#242424',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#242424',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#2a2a2a',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #3a3a3a',
        },
        head: {
          backgroundColor: '#333',
          color: '#fff',
          fontWeight: 600,
          textTransform: 'uppercase',
          fontSize: '13px',
          letterSpacing: '0.5px',
        },
        body: {
          color: '#e0e0e0',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#333',
          },
        },
      },
    },
  },
}); 