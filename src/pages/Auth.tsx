import { useState, useEffect } from 'react';
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
} from '@mui/material';
import { motion } from 'framer-motion';
import { useFirebase } from '../contexts/FirebaseContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

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
  const { signIn, signUp } = useFirebase();
  const [tabValue, setTabValue] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add useEffect to log when component mounts
  useEffect(() => {
    console.log('Auth component mounted');
    console.log('Firebase context available:', !!signUp);
  }, [signUp]);

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
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(loginEmail, loginPassword);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    console.log('1. Form submitted');
    e.preventDefault();
    setError(null);

    console.log('2. Checking password match');
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      setError('Passwords do not match');
      return;
    }

    try {
      console.log('3. Starting signup process...');
      console.log('4. Form data:', { email, name, creditExperience, existingDebt, monthlySpending });
      
      console.log('5. Calling Firebase signUp...');
      const userCredential = await signUp(email, password);
      console.log('6. User created successfully:', userCredential.user.uid);
      
      console.log('7. Preparing Firestore data...');
      const userData = {
        name,
        email,
        creditExperience,
        existingDebt,
        monthlySpending,
        createdAt: new Date().toISOString(),
      };
      console.log('8. User data to store:', userData);
      
      console.log('9. Storing data in Firestore...');
      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      console.log('10. User data stored successfully');

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Signup error details:', err);
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
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

        {showSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {tabValue === 0 ? 'Successfully logged in!' : 'Account created successfully!'}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

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
                margin="normal"
                required
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
                <InputLabel>Average Monthly Spending</InputLabel>
                <Select
                  value={monthlySpending}
                  onChange={(e) => setMonthlySpending(e.target.value)}
                  label="Average Monthly Spending"
                >
                  <MenuItem value="0-1000">Less than $1,000</MenuItem>
                  <MenuItem value="1000-3000">$1,000 - $3,000</MenuItem>
                  <MenuItem value="3000-5000">$3,000 - $5,000</MenuItem>
                  <MenuItem value="5000+">More than $5,000</MenuItem>
                </Select>
              </FormControl>

              <FormControl component="fieldset" margin="normal" required>
                <Typography variant="subtitle1" gutterBottom>
                  Do you currently have credit card debt?
                </Typography>
                <RadioGroup
                  value={existingDebt}
                  onChange={(e) => setExistingDebt(e.target.value)}
                >
                  <FormControlLabel value="no" control={<Radio />} label="No debt" />
                  <FormControlLabel value="less-5k" control={<Radio />} label="Less than $5,000" />
                  <FormControlLabel value="5k-10k" control={<Radio />} label="$5,000 - $10,000" />
                  <FormControlLabel value="more-10k" control={<Radio />} label="More than $10,000" />
                </RadioGroup>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3 }}
              >
                Create Account
              </Button>
            </form>
          </TabPanel>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Auth; 