import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline } from '@mui/material';
import Home from './pages/Home';
import CardComparison from './pages/CardComparison';
import PointsOptimizer from './pages/PointsOptimizer';
import DebtManagement from './pages/DebtManagement';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper' }}>
            <Toolbar>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  flexGrow: 1,
                  textDecoration: 'none',
                  color: 'primary.main',
                  fontWeight: 700,
                }}
              >
                Card Clarity
              </Typography>
              <Button
                component={Link}
                to="/compare"
                color="inherit"
                sx={{ color: 'text.primary', mx: 1 }}
              >
                Compare Cards
              </Button>
              <Button
                component={Link}
                to="/points"
                color="inherit"
                sx={{ color: 'text.primary', mx: 1 }}
              >
                Points Optimizer
              </Button>
              <Button
                component={Link}
                to="/debt"
                color="inherit"
                sx={{ color: 'text.primary', mx: 1 }}
              >
                Debt Management
              </Button>
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<CardComparison />} />
            <Route path="/points" element={<PointsOptimizer />} />
            <Route path="/debt" element={<DebtManagement />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
