import { Container, Typography, Grid, Paper, Box, Button, TextField, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

const DebtManagement = () => {
  const [debtInfo, setDebtInfo] = useState({
    totalDebt: '',
    monthlyPayment: '',
    interestRate: '',
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setDebtInfo({
      ...debtInfo,
      [field]: event.target.value,
    });
  };

  const calculateProgress = () => {
    const total = parseFloat(debtInfo.totalDebt) || 0;
    const monthly = parseFloat(debtInfo.monthlyPayment) || 0;
    return total > 0 ? (monthly / total) * 100 : 0;
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
          Debt Management
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
          Take control of your credit card debt with personalized payoff strategies and create a plan that works for your financial goals.
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
                  Your Debt Profile
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ mb: 3 }}>
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
                      Total Credit Card Debt
                    </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      value={debtInfo.totalDebt}
                      onChange={handleInputChange('totalDebt')}
                      placeholder="Enter total debt amount"
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

                  <Box sx={{ mb: 3 }}>
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
                      Monthly Payment
                    </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      value={debtInfo.monthlyPayment}
                      onChange={handleInputChange('monthlyPayment')}
                      placeholder="Enter monthly payment"
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

                  <Box sx={{ mb: 3 }}>
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
                      Average Interest Rate (%)
                    </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      value={debtInfo.interestRate}
                      onChange={handleInputChange('interestRate')}
                      placeholder="Enter interest rate"
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
                  Calculate Payoff Plan
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
                  Debt Payoff Progress
                </Typography>

                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 4 }}>
                  <CircularProgress
                    variant="determinate"
                    value={calculateProgress()}
                    size={120}
                    thickness={4}
                    sx={{
                      color: '#1d1d1f',
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                      },
                    }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      sx={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: '#1d1d1f',
                      }}
                    >
                      {`${Math.round(calculateProgress())}%`}
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={3}>
                  {[
                    {
                      title: 'Debt Snowball',
                      description: 'Pay off smallest debts first for psychological wins',
                    },
                    {
                      title: 'Debt Avalanche',
                      description: 'Target highest interest rates first to minimize interest',
                    },
                    {
                      title: 'Balance Transfer',
                      description: 'Move high-interest debt to 0% APR cards',
                    },
                  ].map((strategy) => (
                    <Grid item xs={12} key={strategy.title}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
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
                            fontWeight: 600,
                            letterSpacing: '-0.01em',
                            color: '#1d1d1f',
                            mb: 1,
                          }}
                        >
                          {strategy.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'rgba(0, 0, 0, 0.65)',
                            fontSize: '0.9375rem',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {strategy.description}
                        </Typography>
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

export default DebtManagement; 