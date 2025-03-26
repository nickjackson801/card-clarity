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
import BetaBanner from './components/BetaBanner';
import { FirebaseProvider } from './contexts/FirebaseContext';

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
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: 'none'
            }}
          >
            <Toolbar>
              {isMobile && (
                <IconButton
                  color="primary"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
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
                  fontWeight: 600,
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  textDecoration: 'none',
                  color: '#1d1d1f',
                  letterSpacing: '-0.025em',
                  '&:hover': {
                    opacity: 0.8,
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
                      color="primary"
                      startIcon={item.icon}
                      sx={{ 
                        color: '#1d1d1f',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.05)'
                        }
                      }}
                    >
                      {item.text}
                    </Button>
                  ))}
                </Box>
              )}
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

// Wrap the entire app with FirebaseProvider
function AppWrapper() {
  return (
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  );
}

export default AppWrapper;
