import { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface DebtCard {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  paymentStrategy: 'avalanche' | 'snowball';
}

const DebtManagement = () => {
  const [debtCards, setDebtCards] = useState<DebtCard[]>([]);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(500);
  const [newCard, setNewCard] = useState<Partial<DebtCard>>({
    name: '',
    balance: 0,
    interestRate: 0,
    minimumPayment: 0,
    paymentStrategy: 'avalanche',
  });

  const handleAddCard = () => {
    if (newCard.name && newCard.balance && newCard.interestRate && newCard.minimumPayment) {
      setDebtCards([
        ...debtCards,
        {
          id: Date.now().toString(),
          name: newCard.name,
          balance: newCard.balance,
          interestRate: newCard.interestRate,
          minimumPayment: newCard.minimumPayment,
          paymentStrategy: newCard.paymentStrategy as 'avalanche' | 'snowball',
        },
      ]);
      setNewCard({
        name: '',
        balance: 0,
        interestRate: 0,
        minimumPayment: 0,
        paymentStrategy: 'avalanche',
      });
    }
  };

  const handleDeleteCard = (id: string) => {
    setDebtCards(debtCards.filter((card) => card.id !== id));
  };

  const totalDebt = debtCards.reduce((sum, card) => sum + card.balance, 0);
  const totalMinPayment = debtCards.reduce((sum, card) => sum + card.minimumPayment, 0);

  const getPayoffTime = () => {
    if (totalDebt === 0) return 0;
    const monthlyInterestRate = debtCards.reduce(
      (sum, card) => sum + (card.balance * (card.interestRate / 100) / 12),
      0
    );
    const effectivePayment = monthlyPayment - monthlyInterestRate;
    return Math.ceil(totalDebt / effectivePayment);
  };

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
          Track your credit card debt and create a payoff strategy
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Add New Card
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Card Name"
                    value={newCard.name}
                    onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Current Balance"
                    type="number"
                    value={newCard.balance}
                    onChange={(e) => setNewCard({ ...newCard, balance: Number(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Interest Rate (%)"
                    type="number"
                    value={newCard.interestRate}
                    onChange={(e) => setNewCard({ ...newCard, interestRate: Number(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Minimum Payment"
                    type="number"
                    value={newCard.minimumPayment}
                    onChange={(e) => setNewCard({ ...newCard, minimumPayment: Number(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Payment Strategy</InputLabel>
                    <Select
                      value={newCard.paymentStrategy || 'avalanche'}
                      label="Payment Strategy"
                      onChange={(e) => setNewCard({ ...newCard, paymentStrategy: e.target.value as 'avalanche' | 'snowball' })}
                    >
                      <MenuItem value="avalanche">Debt Avalanche (Highest Interest First)</MenuItem>
                      <MenuItem value="snowball">Debt Snowball (Lowest Balance First)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={handleAddCard}
                    startIcon={<AddIcon />}
                    disabled={!newCard.name || !newCard.balance}
                  >
                    Add Card
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {debtCards.map((card) => (
              <Card key={card.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">{card.name}</Typography>
                    <IconButton onClick={() => handleDeleteCard(card.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={4}>
                      <Typography color="text.secondary">Balance</Typography>
                      <Typography variant="h6">${card.balance.toLocaleString()}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography color="text.secondary">Interest Rate</Typography>
                      <Typography variant="h6">{card.interestRate}%</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography color="text.secondary">Minimum Payment</Typography>
                      <Typography variant="h6">${card.minimumPayment.toLocaleString()}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, position: 'sticky', top: 24 }}>
              <Typography variant="h5" gutterBottom>
                Debt Summary
              </Typography>
              <Box sx={{ mb: 4 }}>
                <Typography color="text.secondary" gutterBottom>
                  Total Debt
                </Typography>
                <Typography variant="h4" color="error" gutterBottom>
                  ${totalDebt.toLocaleString()}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={Math.min((monthlyPayment / totalMinPayment) * 100, 100)}
                  sx={{ mt: 2 }}
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography color="text.secondary" gutterBottom>
                  Monthly Payment
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Minimum required: ${totalMinPayment.toLocaleString()}
                </Typography>
              </Box>

              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Estimated Payoff Time
                </Typography>
                <Typography variant="h6">
                  {getPayoffTime()} months
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 4 }}
                disabled={debtCards.length === 0}
              >
                Generate Payoff Plan
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default DebtManagement; 