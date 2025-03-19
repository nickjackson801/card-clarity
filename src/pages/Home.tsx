import { Container, Typography, Grid, Paper, Box, Button } from '@mui/material';
import { CompareArrows, Stars, AccountBalance } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const services = [
    {
      title: 'Compare Cards',
      description: 'Find the perfect credit card by comparing rewards, benefits, and fees. Our smart comparison tool helps you make informed decisions based on your spending habits.',
      icon: <CompareArrows sx={{ fontSize: 40 }} />,
      link: '/compare',
      color: '#2563eb',
    },
    {
      title: 'Points Optimizer',
      description: 'Maximize your credit card rewards with our points optimization tool. Track your points across multiple cards and discover the best redemption options.',
      icon: <Stars sx={{ fontSize: 40 }} />,
      link: '/points',
      color: '#7c3aed',
    },
    {
      title: 'Debt Management',
      description: 'Take control of your credit card debt with personalized payoff strategies. Compare different methods and create a plan that works for your financial goals.',
      icon: <AccountBalance sx={{ fontSize: 40 }} />,
      link: '/debt',
      color: '#059669',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #2563eb 30%, #60a5fa 90%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                  }}
                >
                  Make Smarter Credit Card Decisions
                </Typography>
                <Typography
                  variant="h5"
                  paragraph
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontWeight: 400,
                  }}
                >
                  Compare cards, optimize rewards, and manage debt all in one place.
                </Typography>
                <Button
                  component={Link}
                  to="/compare"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                    mr: 2,
                  }}
                >
                  Compare Cards
                </Button>
                <Button
                  component={Link}
                  to="/auth"
                  variant="outlined"
                  size="large"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'grey.100',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Get Started
                </Button>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={service.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.3s ease-in-out',
                      boxShadow: (theme) => theme.shadows[4],
                    },
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      color: service.color,
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                    {service.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph sx={{ mb: 3, flexGrow: 1 }}>
                    {service.description}
                  </Typography>
                  <Button
                    component={Link}
                    to={service.link}
                    variant="outlined"
                    sx={{
                      alignSelf: 'flex-start',
                      color: service.color,
                      borderColor: service.color,
                      '&:hover': {
                        borderColor: service.color,
                        bgcolor: `${service.color}10`,
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 