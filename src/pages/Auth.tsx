import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useFirebase } from '../contexts/FirebaseContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNotification } from '../contexts/NotificationContext';
import { Google as GoogleIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme();

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle } = useFirebase();
  const { showSuccess, showError } = useNotification();
  const [tabValue, setTabValue] = useState(0);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [creditExperience, setCreditExperience] = useState('');
  const [existingDebt, setExistingDebt] = useState('');
  const [monthlySpending, setMonthlySpending] = useState('');

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(loginEmail, loginPassword);
      showSuccess('Successfully logged in!');
      navigate('/');
    } catch (err) {
      showError('Failed to login. Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  const validateSignupForm = () => {
    if (!name.trim()) {
      showError('Please enter your full name');
      return false;
    }
    if (!email.trim()) {
      showError('Please enter your email address');
      return false;
    }
    if (!email.includes('@')) {
      showError('Please enter a valid email address');
      return false;
    }
    if (!password) {
      showError('Please enter a password');
      return false;
    }
    if (password.length < 6) {
      showError('Password must be at least 6 characters long');
      return false;
    }
    if (!confirmPassword) {
      showError('Please confirm your password');
      return false;
    }
    if (password !== confirmPassword) {
      showError('Passwords do not match');
      return false;
    }
    if (!creditExperience) {
      showError('Please select your credit card experience');
      return false;
    }
    if (!monthlySpending) {
      showError('Please select your average monthly spending');
      return false;
    }
    if (!existingDebt) {
      showError('Please indicate if you have existing credit card debt');
      return false;
    }
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSignupForm()) {
      return;
    }

    try {
      const userCredential = await signUp(email, password);

      const userData = {
        name,
        email,
        creditExperience,
        existingDebt,
        monthlySpending,
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      
      showSuccess('Account created successfully!');
      navigate('/');
    } catch (err: any) {
      console.error('Signup error details:', err);
      if (err.code === 'auth/email-already-in-use') {
        showError('This email address is already registered. Please use a different email or try logging in.');
      } else if (err.code === 'auth/invalid-email') {
        showError('Please enter a valid email address.');
      } else if (err.code === 'auth/weak-password') {
        showError('Password must be at least 6 characters long.');
      } else {
        showError('Failed to create account. Please try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      // Check if this is a new user
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        // Create user profile for new Google users
        const userData = {
          name: result.user.displayName || '',
          email: result.user.email,
          creditExperience: '',
          existingDebt: '',
          monthlySpending: '',
          createdAt: new Date().toISOString()
        };
        await setDoc(doc(db, 'users', result.user.uid), userData);
      }
      showSuccess('Successfully logged in with Google!');
      navigate('/');
    } catch (err: any) {
      console.error('Google sign in error:', {
        code: err.code,
        message: err.message,
        stack: err.stack
      });
      
      let errorMessage = 'Failed to sign in with Google.';
      if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in was cancelled. Please try again.';
      } else if (err.code === 'auth/popup-blocked') {
        errorMessage = 'Sign-in popup was blocked. Please allow popups for this site.';
      } else if (err.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Sign-in was cancelled. Please try again.';
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with the same email address but different sign-in credentials.';
      }
      
      showError(errorMessage);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 2,
              color: '#1d1d1f',
              letterSpacing: '-0.02em'
            }}
          >
            Welcome to Card Clarity
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            sx={{ 
              mb: 4, 
              fontSize: '1.1rem',
              color: 'rgba(0, 0, 0, 0.7)',
              letterSpacing: '-0.01em',
              lineHeight: 1.5
            }}
          >
            Your all-in-one platform for smart credit card management. Compare cards, optimize your points, and take control of your debt.
          </Typography>

          <Paper sx={{ 
            p: 3,
            background: 'linear-gradient(to bottom right, #ffffff, #f8fafc)',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 3 }}
                >
                  Login
                </Button>
              </form>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <form onSubmit={handleSignup}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  helperText="Password must be at least 6 characters long"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  margin="normal"
                  required
                />

                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Credit Card Experience</InputLabel>
                  <Select
                    value={creditExperience}
                    onChange={(e) => setCreditExperience(e.target.value)}
                    label="Credit Card Experience"
                  >
                    <MenuItem value="none">No experience</MenuItem>
                    <MenuItem value="beginner">Beginner (1-2 years)</MenuItem>
                    <MenuItem value="intermediate">Intermediate (3-5 years)</MenuItem>
                    <MenuItem value="advanced">Advanced (5+ years)</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Monthly Spending</InputLabel>
                  <Select
                    value={monthlySpending}
                    onChange={(e) => setMonthlySpending(e.target.value)}
                    label="Monthly Spending"
                  >
                    <MenuItem value="0-1000">Less than $1,000</MenuItem>
                    <MenuItem value="1000-3000">$1,000 - $3,000</MenuItem>
                    <MenuItem value="3000-5000">$3,000 - $5,000</MenuItem>
                    <MenuItem value="5000+">More than $5,000</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Existing Credit Card Debt</InputLabel>
                  <Select
                    value={existingDebt}
                    onChange={(e) => setExistingDebt(e.target.value)}
                    label="Existing Credit Card Debt"
                  >
                    <MenuItem value="no">No debt</MenuItem>
                    <MenuItem value="less-5k">Less than $5,000</MenuItem>
                    <MenuItem value="5k-10k">$5,000 - $10,000</MenuItem>
                    <MenuItem value="more-10k">More than $10,000</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 3 }}
                >
                  Sign Up
                </Button>
              </form>
            </TabPanel>

            <Box sx={{ mt: 3 }}>
              <Divider sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                  Or continue with
                </Typography>
              </Divider>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                sx={{
                  backgroundColor: '#1d1d1f',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#2d2d2f',
                  },
                }}
              >
                Continue with Google
              </Button>
            </Box>
          </Paper>

          {/* Customer Support Section */}
          <Box 
            sx={{ 
              bgcolor: 'background.paper',
              py: 3,
              borderTop: 1,
              borderColor: 'divider',
              mt: 4
            }}
          >
            <Container maxWidth="sm">
              <Typography 
                variant="body2" 
                align="center" 
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Having trouble? Our support team is here to help:
              </Typography>
              <Typography 
                variant="body2" 
                align="center" 
                color="primary"
                component="a"
                href="mailto:customersupport@card-clarity.com"
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                customersupport@card-clarity.com
              </Typography>
            </Container>
          </Box>
        </motion.div>
      </Container>
    </ThemeProvider>
  );
};

export default Auth; 