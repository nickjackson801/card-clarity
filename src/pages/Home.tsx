import { useState } from 'react';
import { Container, Typography, Button, Grid, Box, Paper, TextField, Tab, Tabs } from '@mui/material';
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
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
    <Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h2"
                  color="text.primary"
                  gutterBottom
                  sx={{ fontWeight: 700 }}
                >
                  Make Smarter Credit Card Decisions
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  paragraph
                  sx={{ mb: 4 }}
                >
                  CardClarity helps you navigate the complex world of credit cards. Compare options,
                  optimize rewards, and manage debt with our intelligent platform.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/compare')}
                    >
                      Compare Cards
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/points')}
                    >
                      Optimize Points
                    </Button>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} centered>
                      <Tab label="Login" />
                      <Tab label="Sign Up" />
                    </Tabs>
                  </Box>
                  <TabPanel value={tabValue} index={0}>
                    <form>
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                      />
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 2 }}
                      >
                        Login
                      </Button>
                    </form>
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    <form>
                      <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                      />
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 2 }}
                      >
                        Sign Up
                      </Button>
                    </form>
                  </TabPanel>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, mb: 6 }}
        >
          Why Choose CardClarity?
        </Typography>
        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item key={benefit.title} xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
              >
                <Box sx={{ textAlign: 'center', px: 2 }}>
                  {benefit.icon}
                  <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                    {benefit.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, mb: 6 }}
          >
            Our Services
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item key={feature.title} xs={12} sm={6} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * (index + 2) }}
                >
                  <Paper
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'transform 0.3s ease-in-out',
                      },
                    }}
                    onClick={() => navigate(feature.link)}
                    elevation={2}
                  >
                    {feature.icon}
                    <Typography variant="h5" component="h2" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 