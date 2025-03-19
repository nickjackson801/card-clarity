import { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  FlightTakeoff,
  Hotel,
  Restaurant,
  ShoppingCart,
  TrendingUp,
  Add,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const PointsOptimizer = () => {
  const [linkedCards] = useState([
    {
      name: 'Chase Sapphire Reserve',
      points: 54320,
      lastUpdate: '2024-03-20',
      redemptionOptions: [
        { type: 'Travel', value: 1.5, icon: <FlightTakeoff /> },
        { type: 'Dining', value: 1.25, icon: <Restaurant /> },
        { type: 'Shopping', value: 1.0, icon: <ShoppingCart /> },
      ],
    },
    {
      name: 'Amex Platinum',
      points: 89750,
      lastUpdate: '2024-03-19',
      redemptionOptions: [
        { type: 'Flights', value: 2.0, icon: <FlightTakeoff /> },
        { type: 'Hotels', value: 1.75, icon: <Hotel /> },
        { type: 'Shopping', value: 1.0, icon: <ShoppingCart /> },
      ],
    },
  ]);

  const recommendations = [
    {
      title: 'Book International Flight',
      description: 'Transfer 50,000 points to United Airlines for best value',
      value: '2.2cpp',
      icon: <FlightTakeoff />,
    },
    {
      title: 'Luxury Hotel Booking',
      description: 'Use Amex points through Fine Hotels & Resorts',
      value: '2.0cpp',
      icon: <Hotel />,
    },
    {
      title: 'Dining Rewards',
      description: 'Use Chase points for dining purchases',
      value: '1.5cpp',
      icon: <Restaurant />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Points Optimizer
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Track and optimize your credit card rewards across all your accounts.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">Your Linked Cards</Typography>
                  <Button startIcon={<Add />} variant="outlined">
                    Link New Card
                  </Button>
                </Box>
                <Grid container spacing={3}>
                  {linkedCards.map((card) => (
                    <Grid item xs={12} key={card.name}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {card.name}
                          </Typography>
                          <Typography color="text.secondary" gutterBottom>
                            {card.points.toLocaleString()} points available
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={70}
                            sx={{ mb: 2, height: 8, borderRadius: 4 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            Last updated: {card.lastUpdate}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Paper sx={{ p: 3 }} elevation={2}>
                <Typography variant="h6" gutterBottom>
                  Best Redemption Options
                </Typography>
                <List>
                  {recommendations.map((rec, index) => (
                    <div key={rec.title}>
                      {index > 0 && <Box sx={{ my: 2, borderTop: 1, borderColor: 'divider' }} />}
                      <ListItem>
                        <ListItemIcon>
                          {rec.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={rec.title}
                          secondary={rec.description}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TrendingUp color="success" sx={{ mr: 1 }} />
                          <Typography color="success.main">
                            {rec.value}
                          </Typography>
                        </Box>
                      </ListItem>
                    </div>
                  ))}
                </List>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Paper sx={{ p: 3 }} elevation={2}>
                <Typography variant="h6" gutterBottom>
                  Points Value Calculator
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  See how much your points are worth across different redemption options.
                </Typography>
                {linkedCards.map((card) => (
                  <Box key={card.name} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {card.name}
                    </Typography>
                    <List dense>
                      {card.redemptionOptions.map((option) => (
                        <ListItem key={option.type}>
                          <ListItemIcon>
                            {option.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={option.type}
                            secondary={`${option.value}x value`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}
                <Button variant="contained" fullWidth>
                  Calculate Total Value
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default PointsOptimizer; 