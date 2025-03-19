import { Container, Typography, Button, Grid, Box, Paper } from '@mui/material';
import { CompareRounded, StarRounded, AccountBalanceRounded } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

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
          <Typography
            component={motion.h1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Make Smarter Credit Card Decisions
          </Typography>
          <Typography
            component={motion.p}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Compare cards, optimize rewards, and manage your credit card debt all in one place.
            Take control of your financial future with CardClarity.
          </Typography>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
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
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="lg">
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
  );
};

export default Home; 