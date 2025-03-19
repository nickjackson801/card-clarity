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
  TextField,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  AccountBalance,
  Timeline,
  TrendingDown,
  SwapHoriz,
  CreditCard,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const strategies = [
  {
    name: 'Avalanche Method',
    description: 'Pay off highest interest rate debts first',
    icon: <TrendingDown />,
    benefits: 'Minimizes total interest paid',
  },
  {
    name: 'Snowball Method',
    description: 'Pay off smallest balances first',
    icon: <Timeline />,
    benefits: 'Builds momentum through quick wins',
  },
  {
    name: 'Balance Transfer',
    description: 'Move high-interest debt to 0% APR cards',
    icon: <SwapHoriz />,
    benefits: 'Saves money on interest during promotional period',
  },
];

const calculateUtilization = (balance: number, limit: number) => {
  return (balance / limit) * 100;
};

const DebtManagement = () => {
  const [cards] = useState([
    {
      name: 'Chase Sapphire',
      balance: 4500,
      limit: 10000,
      apr: 16.99,
      minPayment: 125,
    },
    {
      name: 'Amex Gold',
      balance: 2800,
      limit: 8000,
      apr: 18.99,
      minPayment: 85,
    },
  ]);

  const totalDebt = cards.reduce((sum, card) => sum + card.balance, 0);
  const totalMinPayment = cards.reduce((sum, card) => sum + card.minPayment, 0);

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
          Track your credit card debt and create a payoff plan that works for you.
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
                  <Typography variant="h6">Your Credit Cards</Typography>
                  <Button startIcon={<CreditCard />} variant="outlined">
                    Add Card
                  </Button>
                </Box>
                <Grid container spacing={3}>
                  {cards.map((card) => (
                    <Grid item xs={12} key={card.name}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {card.name}
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Typography color="text.secondary" gutterBottom>
                                Current Balance
                              </Typography>
                              <Typography variant="h6" color="error">
                                ${card.balance.toLocaleString()}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography color="text.secondary" gutterBottom>
                                Credit Utilization
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ flexGrow: 1, mr: 1 }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={calculateUtilization(card.balance, card.limit)}
                                    sx={{
                                      height: 8,
                                      borderRadius: 4,
                                    }}
                                  />
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                  {calculateUtilization(card.balance, card.limit).toFixed(1)}%
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography color="text.secondary">
                                APR: {card.apr}%
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography color="text.secondary">
                                Min Payment: ${card.minPayment}
                              </Typography>
                            </Grid>
                          </Grid>
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
                  Debt Payoff Strategies
                </Typography>
                <List>
                  {strategies.map((strategy, index) => (
                    <div key={strategy.name}>
                      {index > 0 && <Divider sx={{ my: 2 }} />}
                      <ListItem>
                        <ListItemIcon>
                          {strategy.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={strategy.name}
                          secondary={strategy.description}
                        />
                        <Tooltip title={strategy.benefits} arrow>
                          <Button variant="outlined" size="small">
                            Learn More
                          </Button>
                        </Tooltip>
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
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <AccountBalance sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Debt Summary
                  </Typography>
                  <Typography variant="h4" color="error" gutterBottom>
                    ${totalDebt.toLocaleString()}
                  </Typography>
                  <Typography color="text.secondary">
                    Total Credit Card Debt
                  </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Monthly Payment
                  </Typography>
                  <TextField
                    fullWidth
                    label="Enter amount"
                    type="number"
                    defaultValue={totalMinPayment}
                    helperText={`Minimum required: $${totalMinPayment}`}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Estimated Payoff Time
                  </Typography>
                  <Typography variant="h6" color="primary">
                    2 years 3 months
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Based on entered monthly payment
                  </Typography>
                </Box>

                <Button variant="contained" fullWidth>
                  Create Payoff Plan
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default DebtManagement; 