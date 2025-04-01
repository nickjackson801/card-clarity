import { Container, Typography, Grid, Paper, Box, Button } from '@mui/material';
import { CompareArrows, Stars, AccountBalance } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FeatureSlideshow from '../components/FeatureSlideshow';
import ChatBot from '../components/ChatBot';

const Home = () => {
  const navigate = useNavigate();

  const handleLearnMore = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const COLORS = {
    cardComparison: {
      main: '#2563eb',
      light: '#60a5fa',
    },
    pointsOptimizer: {
      main: '#7c3aed',
      light: '#a78bfa',
    },
    debtManagement: {
      main: '#059669',
      light: '#34d399',
    },
  };

  const services = [
    {
      title: 'Compare Cards',
      description: 'Find the perfect credit card by comparing rewards, benefits, and fees. Our smart comparison tool helps you make informed decisions based on your spending habits.',
      icon: <CompareArrows sx={{ fontSize: 40 }} />,
      link: '/compare',
      color: COLORS.cardComparison.main,
    },
    {
      title: 'Points Optimizer',
      description: 'Maximize your credit card rewards with our points optimization tool. Track your points across multiple cards and discover the best redemption options.',
      icon: <Stars sx={{ fontSize: 40 }} />,
      link: '/points',
      color: COLORS.pointsOptimizer.main,
    },
    {
      title: 'Debt Management',
      description: 'Take control of your credit card debt with personalized payoff strategies. Compare different methods and create a plan that works for your financial goals.',
      icon: <AccountBalance sx={{ fontSize: 40 }} />,
      link: '/debt',
      color: COLORS.debtManagement.main,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: '#f5f5f7',
          color: '#1d1d1f',
          py: { xs: 12, md: 16 },
          mb: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h1"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.1,
                    mb: 3,
                    letterSpacing: '-0.025em'
                  }}
                >
                  Make smarter credit card decisions
                </Typography>
                <Typography
                  variant="h5"
                  paragraph
                  sx={{ 
                    mb: 4, 
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    color: 'rgba(0, 0, 0, 0.65)',
                    letterSpacing: '-0.01em',
                    fontWeight: 400
                  }}
                >
                  Compare cards, optimize rewards, and manage debt with intelligent tools designed around you.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/auth"
                    sx={{
                      fontSize: '1.125rem',
                      py: 1.5,
                      px: 4,
                      borderRadius: 12,
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    to="/compare"
                    sx={{
                      fontSize: '1.125rem',
                      py: 1.5,
                      px: 4,
                      borderRadius: 12,
                    }}
                  >
                    Compare Cards
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ position: 'relative', pl: { md: 4 } }}>
                  <FeatureSlideshow />
                </Box>
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
                background: 'rgba(0, 0, 0, 0.02)',
                transform: 'translateX(-50%)',
                zIndex: -1,
              }}
            />
            
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 600,
                fontSize: { xs: '2rem', md: '2.75rem' },
                textAlign: 'center',
                mb: 6,
                color: '#1d1d1f',
                letterSpacing: '-0.025em'
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
                      fontWeight: 600,
                      color: '#1d1d1f',
                      mb: 2,
                      position: 'relative',
                      display: 'inline-block',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        width: '40%',
                        height: '1px',
                        background: 'rgba(0, 0, 0, 0.2)',
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
                      color: 'rgba(0, 0, 0, 0.65)',
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
                      fontWeight: 600,
                      color: '#1d1d1f',
                      mb: 2,
                      position: 'relative',
                      display: 'inline-block',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        width: '40%',
                        height: '1px',
                        background: 'rgba(0, 0, 0, 0.2)',
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
                      color: 'rgba(0, 0, 0, 0.65)',
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
                      fontWeight: 600,
                      color: '#1d1d1f',
                      mb: 2,
                      position: 'relative',
                      display: 'inline-block',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        width: '40%',
                        height: '1px',
                        background: 'rgba(0, 0, 0, 0.2)',
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
                      color: 'rgba(0, 0, 0, 0.65)',
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

      {/* Customer Reviews Section */}
      <Box
        sx={{
          background: '#f5f5f7',
          py: { xs: 12, md: 16 },
          mb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 600,
              mb: 8,
              fontSize: { xs: '2rem', md: '2.5rem' },
              letterSpacing: '-0.025em'
            }}
          >
            What our users say
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      fontSize: '1.1rem',
                      fontStyle: 'italic',
                      mb: 3,
                      color: 'rgba(0, 0, 0, 0.65)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.6
                    }}
                  >
                    "I was overwhelmed by all the credit card options out there. This tool helped me find the perfect card that matches my spending habits. Now I'm earning twice the rewards I used to get!"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: '#f5f5f7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#1d1d1f',
                        fontWeight: 500,
                        mr: 2,
                      }}
                    >
                      SM
                    </Box>
                    <Box>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 600,
                          letterSpacing: '-0.01em'
                        }}
                      >
                        Sarah Mitchell
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(0, 0, 0, 0.45)',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        New York, NY
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      fontSize: '1.1rem',
                      fontStyle: 'italic',
                      mb: 3,
                      color: 'rgba(0, 0, 0, 0.65)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.6
                    }}
                  >
                    "The points optimization feature is a game-changer! It tells me exactly which card to use for different purchases, and I've already booked a free flight using the points I earned."
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: '#f5f5f7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#1d1d1f',
                        fontWeight: 500,
                        mr: 2,
                      }}
                    >
                      JR
                    </Box>
                    <Box>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 600,
                          letterSpacing: '-0.01em'
                        }}
                      >
                        James Rodriguez
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(0, 0, 0, 0.45)',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        Austin, TX
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      fontSize: '1.1rem',
                      fontStyle: 'italic',
                      mb: 3,
                      color: 'rgba(0, 0, 0, 0.65)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.6
                    }}
                  >
                    "The debt management tool gave me a clear path to becoming debt-free. It helped me prioritize my payments and showed me exactly how long it would take. I'm now halfway through my payoff plan!"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: '#f5f5f7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#1d1d1f',
                        fontWeight: 500,
                        mr: 2,
                      }}
                    >
                      EW
                    </Box>
                    <Box>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 600,
                          letterSpacing: '-0.01em'
                        }}
                      >
                        Emma Wilson
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(0, 0, 0, 0.45)',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        Seattle, WA
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Grid container spacing={4}>
            {services.map((service) => (
              <Grid item xs={12} md={4} key={service.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Paper
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: 3,
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <Box
                      sx={{
                        mb: 3,
                        color: '#1d1d1f',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 56,
                        height: 56,
                        borderRadius: '16px',
                        background: 'rgba(0, 0, 0, 0.03)',
                      }}
                    >
                      {service.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 600,
                        letterSpacing: '-0.025em',
                        fontSize: '1.25rem'
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: 'rgba(0, 0, 0, 0.65)',
                        mb: 3,
                        flexGrow: 1,
                        letterSpacing: '-0.01em',
                        lineHeight: 1.6
                      }}
                    >
                      {service.description}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => handleLearnMore(service.link)}
                      sx={{
                        mt: 'auto',
                        backgroundColor: service.color,
                        color: '#ffffff',
                        '&:hover': {
                          backgroundColor: service.color,
                          opacity: 0.9,
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
        </motion.div>
      </Container>
      <ChatBot />

      {/* Customer Support Section */}
      <Box 
        sx={{ 
          bgcolor: 'background.paper',
          py: 3,
          borderTop: 1,
          borderColor: 'divider',
          mt: 'auto'
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="body2" 
            align="center" 
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            Need assistance? Contact our customer support team:
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
    </Box>
  );
};

export default Home; 