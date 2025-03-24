import { Container, Typography, Grid, Paper, Box, Button, TextField, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

const PointsOptimizer = () => {
  const [points, setPoints] = useState({
    chase: '',
    amex: '',
    capital_one: '',
  });

  const rewardPrograms = [
    {
      name: 'Chase Ultimate Rewards',
      key: 'chase',
      color: '#1d1d1f',
    },
    {
      name: 'American Express Membership Rewards',
      key: 'amex',
      color: '#1d1d1f',
    },
    {
      name: 'Capital One Miles',
      key: 'capital_one',
      color: '#1d1d1f',
    },
  ];

  const handlePointsChange = (program: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPoints({
      ...points,
      [program]: event.target.value,
    });
  };

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
          Points Optimizer
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
          Maximize the value of your credit card rewards by tracking points across multiple programs and discovering the best redemption options.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
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
                  Your Points Balance
                </Typography>

                <Box sx={{ mb: 4 }}>
                  {rewardPrograms.map((program) => (
                    <Box key={program.key} sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        sx={{
                          fontWeight: 500,
                          letterSpacing: '-0.01em',
                          color: '#1d1d1f',
                          mb: 1
                        }}
                      >
                        {program.name}
                      </Typography>
                      <TextField
                        fullWidth
                        type="number"
                        value={points[program.key as keyof typeof points]}
                        onChange={handlePointsChange(program.key)}
                        placeholder="Enter points balance"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(0, 0, 0, 0.03)',
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: 'transparent',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(0, 0, 0, 0.1)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1d1d1f',
                              borderWidth: '1px',
                            },
                          },
                          '& input': {
                            fontSize: '0.9375rem',
                            letterSpacing: '-0.01em',
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#1d1d1f',
                    color: '#ffffff',
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '0.9375rem',
                    letterSpacing: '-0.01em',
                    '&:hover': {
                      backgroundColor: '#000000',
                    },
                  }}
                >
                  Find Best Value
                </Button>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={7}>
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
                  Redemption Options
                </Typography>

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
                    Popular Categories
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {['Travel', 'Hotels', 'Flights', 'Gift Cards', 'Cash Back', 'Shopping'].map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        sx={{
                          backgroundColor: 'rgba(0, 0, 0, 0.05)',
                          borderRadius: '6px',
                          color: '#1d1d1f',
                          fontSize: '0.8125rem',
                          letterSpacing: '-0.01em',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box>
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
                    Transfer Partners
                  </Typography>
                  <Grid container spacing={2}>
                    {['United Airlines', 'Southwest', 'Marriott', 'Hyatt', 'Delta', 'British Airways'].map((partner) => (
                      <Grid item xs={12} sm={6} key={partner}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            backgroundColor: 'rgba(0, 0, 0, 0.02)',
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.03)',
                              transform: 'translateX(4px)',
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 500,
                              letterSpacing: '-0.01em',
                              color: '#1d1d1f',
                            }}
                          >
                            {partner}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '0.875rem',
                              color: 'rgba(0, 0, 0, 0.45)',
                              letterSpacing: '-0.01em',
                            }}
                          >
                            1:1 transfer ratio
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default PointsOptimizer; 