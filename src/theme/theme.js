import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff9800', // Orange
    },
    background: {
      default: '#fff',  // White background
    },
    text: {
      primary: '#000',  // Black text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 500,
    },
    body1: {
      color: '#000',
    },
  },
});

export default theme;
