import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import {
  TrendingDown,
  AccountBalance,
  Timeline,
  SwapHoriz,
  CreditCard,
  Add,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const DebtManagement = () => {
  const [debts] = useState([
    {
      cardName: 'Chase Freedom',
      balance: 3500,
      apr: 15.99,
      minimumPayment: 85,
      creditLimit: 5000,
    },
    {
      cardName: 'Citi Double Cash',
      balance: 2800,
      apr: 18.99,
      minimumPayment: 70,
      creditLimit: 4000,
    },
  ]);

  const strategies = [
    {
      title: 'Debt Avalanche',
      description: 'Pay highest interest rate first',
      savings: '$523',
      timeToDebtFree: '18 months',
      icon: <TrendingDown />,
    },
    {
      title: 'Debt Snowball',
      description: 'Pay smallest balance first',
      savings: '$486',
      timeToDebtFree: '19 months',
      icon: <Timeline />,
    },
    {
      title: 'Balance Transfer',
      description: 'Transfer to 0% APR card',
      savings: '$892',
      timeToDebtFree: '15 months',
      icon: <SwapHoriz />,
    },
  ];

  const calculateUtilization = (balance: number, limit: number) => {
    return (balance / limit) * 100;
  };

  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinimum = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Debt Management
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Take control of your credit card debt with personalized strategies and tracking.
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Your Credit Card Debt</Typography>
                <Button startIcon={<Add />} variant="outlined">
                  Add Card
                </Button>
              </Box>
              <Grid container spacing={3}>
                {debts.map((debt) => (
                  <Grid item xs={12} key={debt.cardName}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="h6" gutterBottom>
                              {debt.cardName}
                            </Typography>
                            <Typography variant="h5" color="error" gutterBottom>
                              ${debt.balance.toLocaleString()}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography color="text.secondary">
                              {debt.apr}% APR
                            </Typography>
                            <Typography color="text.secondary">
                              Min Payment: ${debt.minimumPayment}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Credit Utilization: {calculateUtilization(debt.balance, debt.creditLimit).toFixed(1)}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={calculateUtilization(debt.balance, debt.creditLimit)}
                            color={calculateUtilization(debt.balance, debt.creditLimit) > 30 ? "error" : "primary"}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
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
                Recommended Debt Payoff Strategies
              </Typography>
              <List>
                {strategies.map((strategy, index) => (
                  <div key={strategy.title}>
                    {index > 0 && <Divider />}
                    <ListItem>
                      <ListItemIcon>
                        {strategy.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={strategy.title}
                        secondary={strategy.description}
                      />
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography color="success.main">
                          Save {strategy.savings}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {strategy.timeToDebtFree}
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
            <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
              <Typography variant="h6" gutterBottom>
                Debt Overview
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Total Debt
                </Typography>
                <Typography variant="h4" color="error" gutterBottom>
                  ${totalDebt.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Minimum Payment
                </Typography>
                <Typography variant="h6">
                  ${totalMinimum.toLocaleString()}/month
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                startIcon={<AccountBalance />}
                sx={{ mb: 2 }}
              >
                Start Debt Payoff Plan
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<CreditCard />}
              >
                Explore Balance Transfer
              </Button>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DebtManagement; 