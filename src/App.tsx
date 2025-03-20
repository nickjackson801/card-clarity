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
  Quiz as QuizIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import Home from './pages/Home';
import CardComparison from './pages/CardComparison';
import PointsOptimizer from './pages/PointsOptimizer';
import DebtManagement from './pages/DebtManagement';
import Auth from './pages/Auth';
import Quiz from './pages/Quiz';

const appTheme = createTheme({
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
    gold: {
      main: '#FFD700',
      light: '#FFE55C',
      dark: '#B8860B',
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

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Take Quiz', icon: <QuizIcon />, path: '/quiz' },
    { text: 'Compare Cards', icon: <CompareArrows />, path: '/compare' },
    { text: 'Points Optimizer', icon: <Stars />, path: '/points' },
    { text: 'Debt Management', icon: <AccountBalance />, path: '/debt' },
    { text: 'Login', icon: <Login />, path: '/auth' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar 
            position="fixed" 
            sx={{ 
              background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderRadius: 0,
              margin: 0,
              width: '100%'
            }}
          >
            <Toolbar>
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, color: 'white' }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography
                variant="h5"
                component={Link}
                to="/"
                sx={{
                  flexGrow: 1,
                  fontWeight: 800,
                  fontSize: { xs: '1.5rem', md: '1.75rem' },
                  textDecoration: 'none',
                  color: 'white',
                  letterSpacing: '-0.5px',
                  '&:hover': {
                    opacity: 0.9,
                  },
                }}
              >
                Card Clarity
              </Typography>
              {!isMobile && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {menuItems.map((item) => (
                    <Button
                      key={item.text}
                      component={Link}
                      to={item.path}
                      color="inherit"
                      startIcon={item.icon}
                      sx={{ color: 'white' }}
                    >
                      {item.text}
                    </Button>
                  ))}
                </Box>
              )}
            </Toolbar>
          </AppBar>

          {isMobile && (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better mobile performance
              }}
              sx={{
                '& .MuiDrawer-paper': { width: 250 },
              }}
            >
              {drawer}
            </Drawer>
          )}

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/compare" element={<CardComparison />} />
              <Route path="/points" element={<PointsOptimizer />} />
              <Route path="/debt" element={<DebtManagement />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
