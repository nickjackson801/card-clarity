import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
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
  Divider,
} from '@mui/material';
import {
  Home as HomeIcon,
  Menu as MenuIcon,
  CompareArrows,
  Stars,
  AccountBalance,
  Login,
  Quiz as QuizIcon,
  Person,
} from '@mui/icons-material';
import { useState } from 'react';
import Home from './pages/Home';
import CardComparison from './pages/CardComparison';
import PointsOptimizer from './pages/PointsOptimizer';
import DebtManagement from './pages/DebtManagement';
import Auth from './pages/Auth';
import Quiz from './pages/Quiz';
import BetaBanner from './components/BetaBanner';
import { FirebaseProvider, useFirebase } from './contexts/FirebaseContext';
import { UserProfile } from './components/UserProfile';
import Profile from './pages/Profile';
import { NotificationProvider } from './contexts/NotificationContext';

declare module '@mui/material/styles' {
  interface Palette {
    gold: Palette['primary'];
  }
  interface PaletteOptions {
    gold?: PaletteOptions['primary'];
  }
}

const appTheme = createTheme({
  palette: {
    primary: {
      main: '#1d1d1f',
      light: '#2d2d2f',
      dark: '#000000',
    },
    secondary: {
      main: '#06c',
      light: '#147ce5',
      dark: '#0055b3',
    },
    text: {
      primary: '#1d1d1f',
      secondary: 'rgba(0, 0, 0, 0.65)',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    gold: {
      main: '#1d1d1f',
      light: '#2d2d2f',
      dark: '#000000',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
    h1: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontWeight: 500,
      letterSpacing: '-0.025em',
    },
    h5: {
      fontWeight: 500,
      letterSpacing: '-0.025em',
    },
    h6: {
      fontWeight: 500,
      letterSpacing: '-0.025em',
    },
    body1: {
      letterSpacing: '-0.01em',
    },
    body2: {
      letterSpacing: '-0.01em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          letterSpacing: '-0.01em',
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlined: {
          borderColor: 'rgba(0, 0, 0, 0.1)',
          '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.2)',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#06c',
            },
          },
        },
      },
    },
  },
});

function AppContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useFirebase();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      {user && (
        <Box sx={{ p: 2 }}>
          <UserProfile />
        </Box>
      )}
      <Divider />
      <List>
        <ListItem
          component={Link}
          to="/"
          onClick={handleDrawerToggle}
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          component={Link}
          to="/quiz"
          onClick={handleDrawerToggle}
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <ListItemIcon><QuizIcon /></ListItemIcon>
          <ListItemText primary="Take Quiz" />
        </ListItem>
        <ListItem
          component={Link}
          to="/compare"
          onClick={handleDrawerToggle}
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <ListItemIcon><CompareArrows /></ListItemIcon>
          <ListItemText primary="Compare Cards" />
        </ListItem>
        <ListItem
          component={Link}
          to="/points"
          onClick={handleDrawerToggle}
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <ListItemIcon><Stars /></ListItemIcon>
          <ListItemText primary="Points Optimizer" />
        </ListItem>
        <ListItem
          component={Link}
          to="/debt"
          onClick={handleDrawerToggle}
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <ListItemIcon><AccountBalance /></ListItemIcon>
          <ListItemText primary="Debt Management" />
        </ListItem>
        <ListItem
          component={Link}
          to="/profile"
          onClick={handleDrawerToggle}
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <ListItemIcon><Person /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        {!user && (
          <ListItem
            component={Link}
            to="/auth"
            onClick={handleDrawerToggle}
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon><Login /></ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2,
                color: '#1d1d1f'
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'text.primary',
              fontWeight: 600
            }}
          >
            Card Clarity
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
            <Button
              component={Link}
              to="/"
              color="primary"
              startIcon={<HomeIcon />}
              sx={{ textTransform: 'none' }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/quiz"
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              Take Quiz
            </Button>
            <Button
              component={Link}
              to="/compare"
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              Compare Cards
            </Button>
            <Button
              component={Link}
              to="/points"
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              Points Optimizer
            </Button>
            <Button
              component={Link}
              to="/debt"
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              Debt Management
            </Button>
            <Button
              component={Link}
              to="/profile"
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              Profile
            </Button>
            {!user ? (
              <Button
                component={Link}
                to="/auth"
                color="primary"
                startIcon={<Login />}
                sx={{ textTransform: 'none' }}
              >
                Login / Signup
              </Button>
            ) : (
              <UserProfile />
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ pt: { xs: 8, sm: 9 } }}>
        <BetaBanner />
      </Box>

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
          <Route path="/auth" element={<Auth />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/compare" element={<CardComparison />} />
          <Route path="/points" element={<PointsOptimizer />} />
          <Route path="/debt" element={<DebtManagement />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Router>
        <FirebaseProvider>
          <NotificationProvider>
            <AppContent />
          </NotificationProvider>
        </FirebaseProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
