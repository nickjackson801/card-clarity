import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CssBaseline,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Home as HomeIcon,
  Menu as MenuIcon,
  CompareArrows,
  Stars,
  AccountBalance,
  Login,
} from '@mui/icons-material';
import { useState } from 'react';
import Home from './pages/Home';
import CardComparison from './pages/CardComparison';
import PointsOptimizer from './pages/PointsOptimizer';
import DebtManagement from './pages/DebtManagement';
import Auth from './pages/Auth';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#db2777',
      light: '#ec4899',
      dark: '#be185d',
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Compare Cards', icon: <CompareArrows />, path: '/compare' },
    { text: 'Points Optimizer', icon: <Stars />, path: '/points' },
    { text: 'Debt Management', icon: <AccountBalance />, path: '/debt' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            component={Link}
            to={item.path}
            key={item.text}
            onClick={handleDrawerToggle}
            sx={{
              '&:hover': {
                bgcolor: 'rgba(37, 99, 235, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem
          component={Link}
          to="/auth"
          onClick={handleDrawerToggle}
          sx={{
            mt: 2,
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'white' }}>
            <Login />
          </ListItemIcon>
          <ListItemText primary="Login / Signup" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename="/card-clarity">
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
              
              {isMobile ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ color: 'text.primary' }}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <>
                  <IconButton
                    component={Link}
                    to="/"
                    sx={{
                      color: 'text.primary',
                      mr: 1,
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    <HomeIcon />
                  </IconButton>
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
                  <Button
                    component={Link}
                    to="/auth"
                    variant="contained"
                    sx={{
                      ml: 2,
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                      }
                    }}
                  >
                    Login / Signup
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>

          <Drawer
            variant="temporary"
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better mobile performance
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
            }}
          >
            {drawer}
          </Drawer>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<CardComparison />} />
            <Route path="/points" element={<PointsOptimizer />} />
            <Route path="/debt" element={<DebtManagement />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
