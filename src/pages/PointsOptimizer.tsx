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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Chip,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface PointsCard {
  id: string;
  name: string;
  pointsBalance: number;
  pointType: string;
  transferPartners: string[];
}

const PointsOptimizer = () => {
  const [cards, setCards] = useState<PointsCard[]>([]);
  const [newCard, setNewCard] = useState<Partial<PointsCard>>({
    name: '',
    pointsBalance: 0,
    pointType: '',
    transferPartners: [],
  });

  const pointTypes = [
    'Chase Ultimate Rewards',
    'American Express Membership Rewards',
    'Capital One Miles',
    'Citi ThankYou Points',
    'Airline Miles',
    'Hotel Points',
  ];

  const transferPartners = {
    'Chase Ultimate Rewards': [
      'United Airlines',
      'Southwest Airlines',
      'British Airways',
      'Air France/KLM',
      'Hyatt',
      'Marriott',
    ],
    'American Express Membership Rewards': [
      'Delta Airlines',
      'British Airways',
      'Air France/KLM',
      'Emirates',
      'Hilton',
      'Marriott',
    ],
    'Capital One Miles': [
      'Air Canada',
      'Emirates',
      'British Airways',
      'Air France/KLM',
      'Wyndham',
    ],
    'Citi ThankYou Points': [
      'Air France/KLM',
      'Emirates',
      'JetBlue',
      'Singapore Airlines',
    ],
    'Airline Miles': [],
    'Hotel Points': [],
  };

  const handleAddCard = () => {
    if (newCard.name && newCard.pointsBalance && newCard.pointType) {
      setCards([
        ...cards,
        {
          id: Date.now().toString(),
          name: newCard.name,
          pointsBalance: newCard.pointsBalance,
          pointType: newCard.pointType,
          transferPartners: transferPartners[newCard.pointType as keyof typeof transferPartners] || [],
        },
      ]);
      setNewCard({
        name: '',
        pointsBalance: 0,
        pointType: '',
        transferPartners: [],
      });
    }
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const totalPoints = cards.reduce((sum, card) => sum + card.pointsBalance, 0);

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
          Track and optimize your rewards points across different programs
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Add Points Balance
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
                    label="Points Balance"
                    type="number"
                    value={newCard.pointsBalance}
                    onChange={(e) => setNewCard({ ...newCard, pointsBalance: Number(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Points Type</InputLabel>
                    <Select
                      value={newCard.pointType}
                      label="Points Type"
                      onChange={(e) => setNewCard({ ...newCard, pointType: e.target.value })}
                    >
                      {pointTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={handleAddCard}
                    startIcon={<AddIcon />}
                    disabled={!newCard.name || !newCard.pointsBalance || !newCard.pointType}
                  >
                    Add Card
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {cards.map((card) => (
              <Card key={card.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">{card.name}</Typography>
                    <IconButton onClick={() => handleDeleteCard(card.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <Typography color="text.secondary">Points Balance</Typography>
                      <Typography variant="h6">{card.pointsBalance.toLocaleString()} points</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography color="text.secondary">Points Type</Typography>
                      <Typography variant="h6">{card.pointType}</Typography>
                    </Grid>
                  </Grid>
                  {card.transferPartners.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography color="text.secondary" gutterBottom>
                        Transfer Partners
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {card.transferPartners.map((partner) => (
                          <Chip
                            key={partner}
                            label={partner}
                            size="small"
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, position: 'sticky', top: 24 }}>
              <Typography variant="h5" gutterBottom>
                Points Summary
              </Typography>
              <Box sx={{ mb: 4 }}>
                <Typography color="text.secondary" gutterBottom>
                  Total Points
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  {totalPoints.toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Estimated Value
                </Typography>
                <Typography variant="h5" color="success.main">
                  ${(totalPoints * 0.015).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Based on average value of 1.5¢ per point
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                disabled={cards.length === 0}
              >
                Find Best Redemption Options
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default PointsOptimizer; 