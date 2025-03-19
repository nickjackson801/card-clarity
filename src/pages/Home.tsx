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

      {/* Purpose Statement Section */}
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              py: { xs: 6, md: 8 },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: '200%',
                height: '100%',
                background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.08) 0%, rgba(124, 58, 237, 0.05) 50%, rgba(5, 150, 105, 0.03) 100%)',
                transform: 'translateX(-50%)',
                zIndex: -1,
              }}
            />
            
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '2.75rem' },
                textAlign: 'center',
                mb: 6,
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #059669 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Empowering Your Financial Journey
            </Typography>

            <Grid container spacing={6} alignItems="flex-start">
              <Grid item xs={12} md={4}>
                <Box sx={{ position: 'relative' }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: '#059669',
                      mb: 2,
                      position: 'relative',
                      display: 'inline-block',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        width: '40%',
                        height: '2px',
                        background: 'linear-gradient(to right, #059669, transparent)',
                      },
                    }}
                  >
                    Smart Card Selection
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      color: 'text.secondary',
                      mt: 2,
                    }}
                  >
                    Finding the right credit card shouldn't be overwhelming. We analyze your spending patterns 
                    and preferences to recommend cards that align with your lifestyle, helping you earn more 
                    rewards on purchases you already make.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ position: 'relative' }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: 'secondary.main',
                      mb: 2,
                      position: 'relative',
                      display: 'inline-block',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        width: '40%',
                        height: '2px',
                        background: 'linear-gradient(to right, #db2777, transparent)',
                      },
                    }}
                  >
                    Points Optimization
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      color: 'text.secondary',
                      mt: 2,
                    }}
                  >
                    We bridge the gap in credit card rewards by helping you discover the true value of your points. 
                    Our expert system matches your travel goals and interests with the best redemption opportunities, 
                    ensuring you get maximum value from every point earned.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ position: 'relative' }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: '#7c3aed',
                      mb: 2,
                      position: 'relative',
                      display: 'inline-block',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        width: '40%',
                        height: '2px',
                        background: 'linear-gradient(to right, #7c3aed, transparent)',
                      },
                    }}
                  >
                    Debt Management
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      color: 'text.secondary',
                      mt: 2,
                    }}
                  >
                    With credit card debt becoming a growing global concern, we're committed to helping you stay 
                    financially healthy. Our tools and strategies empower you to manage debt effectively, make 
                    informed decisions, and work towards a debt-free future.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Container>

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