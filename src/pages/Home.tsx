import { Container, Typography, Grid, Paper, Box, Button } from '@mui/material';
import { CompareArrows, Stars, AccountBalance } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FeatureSlideshow from '../components/FeatureSlideshow';

const Home = () => {
  const navigate = useNavigate();

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
          background: `linear-gradient(45deg, ${COLORS.cardComparison.main} 30%, ${COLORS.cardComparison.light} 90%)`,
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
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                    mb: 3,
                  }}
                >
                  Make Smarter Credit Card Decisions
                </Typography>
                <Typography
                  variant="h5"
                  color="inherit"
                  paragraph
                  sx={{ 
                    mb: 4, 
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    opacity: 0.9
                  }}
                >
                  Compare cards, optimize points, and manage debt with our comprehensive suite of tools.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/quiz')}
                    sx={{
                      background: 'white',
                      color: COLORS.cardComparison.main,
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.9)',
                      }
                    }}
                  >
                    Take Our Quiz
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/compare')}
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'rgba(255, 255, 255, 0.9)',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                  >
                    Compare Cards
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <FeatureSlideshow />
                </motion.div>
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
                background: `radial-gradient(circle at center, rgba(37, 99, 235, 0.08) 0%, rgba(124, 58, 237, 0.05) 50%, rgba(5, 150, 105, 0.03) 100%)`,
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
                background: `linear-gradient(135deg, ${COLORS.cardComparison.main} 0%, ${COLORS.pointsOptimizer.main} 50%, ${COLORS.debtManagement.main} 100%)`,
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
                      color: COLORS.cardComparison.main,
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
                        background: `linear-gradient(to right, ${COLORS.cardComparison.main}, transparent)`,
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
                      color: COLORS.pointsOptimizer.main,
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
                        background: `linear-gradient(to right, ${COLORS.pointsOptimizer.main}, transparent)`,
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
                      color: COLORS.debtManagement.main,
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
                        background: `linear-gradient(to right, ${COLORS.debtManagement.main}, transparent)`,
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

      {/* Customer Reviews Section */}
      <Box
        sx={{
          background: `linear-gradient(to bottom, rgba(37, 99, 235, 0.03), rgba(124, 58, 237, 0.05))`,
          py: { xs: 8, md: 12 },
          mb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 6,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            What Our Users Say
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      fontSize: '1.1rem',
                      fontStyle: 'italic',
                      mb: 3,
                      color: 'text.secondary',
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
                        background: `linear-gradient(45deg, ${COLORS.cardComparison.main}, ${COLORS.cardComparison.light})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 600,
                        mr: 2,
                      }}
                    >
                      SM
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Sarah Mitchell
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
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
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      fontSize: '1.1rem',
                      fontStyle: 'italic',
                      mb: 3,
                      color: 'text.secondary',
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
                        background: `linear-gradient(45deg, ${COLORS.pointsOptimizer.main}, ${COLORS.pointsOptimizer.light})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 600,
                        mr: 2,
                      }}
                    >
                      JR
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        James Rodriguez
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
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
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      fontSize: '1.1rem',
                      fontStyle: 'italic',
                      mb: 3,
                      color: 'text.secondary',
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
                        background: `linear-gradient(45deg, ${COLORS.debtManagement.main}, ${COLORS.debtManagement.light})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 600,
                        mr: 2,
                      }}
                    >
                      EW
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Emma Wilson
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
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