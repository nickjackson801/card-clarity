import { Container, Typography, Grid, Paper, Box, Chip, Select, MenuItem, FormControl, Slider } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

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
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: { xs: '2rem', md: '2.5rem' },
            letterSpacing: '-0.025em',
            mb: 2
          }}
        >
          Compare Credit Cards
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(0, 0, 0, 0.65)',
            fontSize: '1.125rem',
            letterSpacing: '-0.01em',
            mb: 6,
            maxWidth: '42rem'
          }}
        >
          Discover the ideal credit card by analyzing rewards, fees, and benefits tailored to your spending style.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper 
                sx={{ 
                  p: 4,
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 3,
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    letterSpacing: '-0.025em',
                    color: '#1d1d1f',
                    mb: 4
                  }}
                >
                  Your Spending Profile
                </Typography>

                <Box sx={{ mb: 6 }}>
                  <Typography 
                    variant="subtitle2" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 500,
                      letterSpacing: '-0.01em',
                      color: '#1d1d1f',
                      mb: 2
                    }}
                  >
                    Monthly Spending
                  </Typography>
                  <Slider
                    value={spendingAmount}
                    onChange={(_: Event, value: number | number[]) => {
                      if (typeof value === 'number') {
                        setSpendingAmount(value);
                      }
                    }}
                    min={0}
                    max={30000}
                    step={100}
                    valueLabelDisplay="on"
                    valueLabelFormat={(value: number) => `$${value.toLocaleString()}`}
                    marks={[
                      { value: 0, label: '$0' },
                      { value: 15000, label: '$15K' },
                      { value: 30000, label: '$30K' },
                    ]}
                    sx={{
                      color: '#1d1d1f',
                      '& .MuiSlider-rail': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      },
                      '& .MuiSlider-track': {
                        backgroundColor: '#1d1d1f',
                      },
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#ffffff',
                        border: '2px solid #1d1d1f',
                        '&:hover, &.Mui-focusVisible': {
                          boxShadow: '0 0 0 8px rgba(29, 29, 31, 0.1)',
                        },
                      },
                      '& .MuiSlider-valueLabel': {
                        backgroundColor: '#1d1d1f',
                        fontSize: '0.875rem',
                        padding: '4px 8px',
                        borderRadius: '6px',
                      },
                      '& .MuiSlider-markLabel': {
                        color: 'rgba(0, 0, 0, 0.45)',
                        fontSize: '0.875rem',
                        letterSpacing: '-0.01em',
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="subtitle2" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 500,
                      letterSpacing: '-0.01em',
                      color: '#1d1d1f',
                      mb: 2
                    }}
                  >
                    Primary Spending Category
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      displayEmpty
                      sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.03)',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'transparent',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1d1d1f',
                          borderWidth: '1px',
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        <Typography sx={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                          Select a category
                        </Typography>
                      </MenuItem>
                      {categories.map((cat) => (
                        <MenuItem 
                          key={cat} 
                          value={cat}
                          sx={{
                            fontSize: '0.9375rem',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  {category && (
                    <Chip
                      label={category}
                      onDelete={() => setCategory('')}
                      sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        borderRadius: '8px',
                        color: '#1d1d1f',
                        '& .MuiChip-deleteIcon': {
                          color: 'rgba(0, 0, 0, 0.45)',
                          '&:hover': {
                            color: '#1d1d1f',
                          },
                        },
                      }}
                    />
                  )}
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Paper 
                sx={{ 
                  p: 4,
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 3,
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    letterSpacing: '-0.025em',
                    color: '#1d1d1f',
                    mb: 4
                  }}
                >
                  Recommended Cards
                </Typography>

                <Grid container spacing={3}>
                  {sampleCards.map((card) => (
                    <Grid item xs={12} key={card.name}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.03)',
                            transform: 'translateX(4px)',
                          },
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={8}>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: 600,
                                letterSpacing: '-0.01em',
                                mb: 1
                              }}
                            >
                              {card.name}
                            </Typography>
                            <Typography 
                              sx={{ 
                                color: 'rgba(0, 0, 0, 0.65)',
                                mb: 2,
                                letterSpacing: '-0.01em',
                              }}
                            >
                              {card.rewards}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {card.features.map((feature, index) => (
                                <Chip
                                  key={index}
                                  label={feature}
                                  size="small"
                                  sx={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                    borderRadius: '6px',
                                    color: '#1d1d1f',
                                    fontSize: '0.8125rem',
                                    letterSpacing: '-0.01em',
                                  }}
                                />
                              ))}
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography 
                                sx={{ 
                                  color: 'rgba(0, 0, 0, 0.45)',
                                  fontSize: '0.875rem',
                                  letterSpacing: '-0.01em',
                                  mb: 0.5
                                }}
                              >
                                Annual Fee
                              </Typography>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  fontWeight: 600,
                                  letterSpacing: '-0.01em',
                                  color: card.annualFee === 0 ? '#059669' : '#1d1d1f'
                                }}
                              >
                                {card.annualFee === 0 ? 'No Annual Fee' : `$${card.annualFee}`}
                              </Typography>
                              <Typography 
                                sx={{ 
                                  color: '#06c',
                                  fontSize: '0.875rem',
                                  letterSpacing: '-0.01em',
                                  mt: 2,
                                  cursor: 'pointer',
                                  '&:hover': {
                                    textDecoration: 'underline',
                                  }
                                }}
                              >
                                View Details →
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default CardComparison; 