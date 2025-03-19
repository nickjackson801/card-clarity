import { useState } from 'react';
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
  const [tabValue, setTabValue] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the signup logic
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #059669 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Welcome to Card Clarity
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{ mb: 4, fontSize: '1.1rem' }}
        >
          Your all-in-one platform for smart credit card management. Compare cards, optimize your points, and take control of your debt.
        </Typography>

        {showSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {tabValue === 0 ? 'Successfully logged in!' : 'Account created successfully!'}
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