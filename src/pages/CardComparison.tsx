import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';

const CardComparison = () => {
  const [spendingAmount, setSpendingAmount] = useState<number>(1000);
  const [category, setCategory] = useState<string>('');

  const categories = [
    'Travel',
    'Dining',
    'Groceries',
    'Gas',
    'Entertainment',
    'Shopping',
    'Business'
  ];

  const sampleCards = [
    {
      name: 'Travel Rewards Plus',
      annualFee: 95,
      rewards: '3x on Travel, 2x on Dining',
      welcomeBonus: '60,000 points',
      features: ['No foreign transaction fees', 'Travel insurance', 'Airport lounge access']
    },
    {
      name: 'Cash Back Preferred',
      annualFee: 0,
      rewards: '2% on all purchases',
      welcomeBonus: '$200 cash back',
      features: ['No annual fee', '0% APR for 15 months', 'Cell phone protection']
    },
    // Add more sample cards as needed
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Find Your Perfect Card
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Tell us about your spending habits and we'll help you find the best card for your needs.
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper sx={{ p: 3 }} elevation={2}>
              <Typography variant="h6" gutterBottom>
                Monthly Spending
              </Typography>
              <Slider
                value={spendingAmount}
                onChange={(_, value) => setSpendingAmount(value as number)}
                min={0}
                max={10000}
                step={100}
                valueLabelDisplay="on"
                valueLabelFormat={(value) => `$${value}`}
              />

              <Box sx={{ mt: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>Primary Spending Category</InputLabel>
                  <Select
                    value={category}
                    label="Primary Spending Category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 4 }}
              >
                Find Cards
              </Button>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {sampleCards.map((card, index) => (
              <Grid item xs={12} key={card.name}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'transform 0.3s ease-in-out',
                      },
                    }}
                    elevation={2}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <Typography variant="h5" component="h2" gutterBottom>
                          {card.name}
                        </Typography>
                        <Typography color="text.secondary" paragraph>
                          {card.rewards}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          {card.features.map((feature) => (
                            <Chip
                              key={feature}
                              label={feature}
                              sx={{ mr: 1, mb: 1 }}
                              size="small"
                            />
                          ))}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="h6" color="primary">
                            {card.welcomeBonus}
                          </Typography>
                          <Typography color="text.secondary">
                            Welcome Bonus
                          </Typography>
                          <Typography sx={{ mt: 2 }}>
                            Annual Fee: ${card.annualFee}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CardComparison; 