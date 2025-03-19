import { useState } from 'react';
import { Container, Typography, Button, Grid, Box, Paper, TextField, Tab, Tabs, Chip } from '@mui/material';
import { CompareRounded, StarRounded, AccountBalanceRounded, Security, Timeline, TrendingUp } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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

const Home = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const features = [
    {
      icon: <CompareRounded sx={{ fontSize: 40 }} />,
      title: 'Compare Credit Cards',
      description: 'Find the perfect credit card tailored to your spending habits and lifestyle.',
      link: '/compare'
    },
    {
      icon: <StarRounded sx={{ fontSize: 40 }} />,
      title: 'Optimize Rewards',
      description: 'Maximize your credit card rewards by tracking and optimizing your points.',
      link: '/points'
    },
    {
      icon: <AccountBalanceRounded sx={{ fontSize: 40 }} />,
      title: 'Manage Debt',
      description: 'Get personalized strategies to manage and reduce your credit card debt.',
      link: '/debt'
    }
  ];

  const benefits = [
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Smart Recommendations',
      description: 'Our AI-powered system analyzes your spending patterns to recommend the best cards for your lifestyle.'
    },
    {
      icon: <Timeline sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Track Your Progress',
      description: 'Monitor your rewards, spending, and debt payoff progress all in one place.'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Maximize Value',
      description: 'Get the most out of your credit cards with our points optimization strategies.'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Card Clarity
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Find the perfect credit card for your lifestyle
          </Typography>
          <Chip
            label="Free During Beta"
            color="primary"
            sx={{
              fontSize: '1rem',
              py: 2,
              px: 3,
              mb: 4,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white',
            }}
          />
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  background: 'linear-gradient(to bottom right, #ffffff, #f8fafc)',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h4" component="h2" gutterBottom>
                  Find Your Perfect Card
                </Typography>
                <Typography paragraph>
                  Take our quick quiz to get personalized credit card recommendations based on your spending habits and preferences.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/quiz')}
                  sx={{
                    mt: 2,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                    }
                  }}
                >
                  Take the Quiz
                </Button>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  background: 'linear-gradient(to bottom right, #ffffff, #f8fafc)',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h4" component="h2" gutterBottom>
                  Compare Cards
                </Typography>
                <Typography paragraph>
                  Browse and compare different credit cards side by side to find the best match for your needs.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/compare')}
                  sx={{
                    mt: 2,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                    }
                  }}
                >
                  Compare Cards
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Home; 