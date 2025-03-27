import { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  Divider,
  Button,
  TextField,
  IconButton,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import { useFirebase } from '../contexts/FirebaseContext';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Navigate } from 'react-router-dom';
import { Edit as EditIcon, Add as AddIcon, CreditCard as CreditCardIcon } from '@mui/icons-material';
import { useNotification } from '../contexts/NotificationContext';

interface UserData {
  name: string;
  email: string;
  creditExperience: string;
  monthlySpending: string;
  existingDebt: string;
  createdAt: string;
}

interface CreditCard {
  id: string;
  name: string;
  lastFourDigits: string;
  balance: number;
  availableCredit: number;
  rewardsBalance: number;
  rewardsType: string;
}

const Profile = () => {
  const { user } = useFirebase();
  const { showSuccess, showError } = useNotification();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<UserData | null>(null);
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState<Partial<CreditCard>>({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data() as UserData;
            setUserData(data);
            setEditedData(data);
          }

          // Fetch credit cards (to be implemented with actual API)
          // This is mock data for now
          setCreditCards([
            {
              id: '1',
              name: 'Chase Sapphire Preferred',
              lastFourDigits: '1234',
              balance: 1500,
              availableCredit: 10000,
              rewardsBalance: 50000,
              rewardsType: 'Ultimate Rewards Points'
            }
          ]);
        } catch (error) {
          console.error('Error fetching user data:', error);
          showError('Failed to load profile data');
        }
      }
    };

    fetchUserData();
  }, [user]);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedData(userData);
  };

  const handleSave = async () => {
    if (!user || !editedData) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, editedData, { merge: true });
      setUserData(editedData);
      setIsEditing(false);
      showSuccess('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      showError('Failed to update profile');
    }
  };

  const handleInputChange = (field: keyof UserData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editedData) {
      setEditedData({
        ...editedData,
        [field]: event.target.value
      });
    }
  };

  const handleSelectChange = (field: keyof UserData) => (event: SelectChangeEvent) => {
    if (editedData) {
      setEditedData({
        ...editedData,
        [field]: event.target.value
      });
    }
  };

  const handleAddCard = () => {
    setIsAddingCard(true);
  };

  const handleCardSubmit = async () => {
    // To be implemented with actual API integration
    showSuccess('Credit card added successfully');
    setIsAddingCard(false);
    setNewCard({});
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Information */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                    mr: 3
                  }}
                >
                  {userData?.name?.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      label="Name"
                      value={editedData?.name || ''}
                      onChange={handleInputChange('name')}
                      sx={{ mb: 1 }}
                    />
                  ) : (
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {userData?.name}
                    </Typography>
                  )}
                  <Typography variant="body1" color="text.secondary">
                    {userData?.email}
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={handleEditToggle} color="primary">
                <EditIcon />
              </IconButton>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Credit Card Experience
                </Typography>
                {isEditing ? (
                  <FormControl fullWidth>
                    <Select
                      value={editedData?.creditExperience || ''}
                      onChange={handleSelectChange('creditExperience')}
                    >
                      <MenuItem value="none">No experience</MenuItem>
                      <MenuItem value="beginner">Beginner (1-2 years)</MenuItem>
                      <MenuItem value="intermediate">Intermediate (3-5 years)</MenuItem>
                      <MenuItem value="advanced">Advanced (5+ years)</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <Typography variant="body1">{userData?.creditExperience}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Monthly Spending
                </Typography>
                {isEditing ? (
                  <FormControl fullWidth>
                    <Select
                      value={editedData?.monthlySpending || ''}
                      onChange={handleSelectChange('monthlySpending')}
                    >
                      <MenuItem value="0-1000">Less than $1,000</MenuItem>
                      <MenuItem value="1000-3000">$1,000 - $3,000</MenuItem>
                      <MenuItem value="3000-5000">$3,000 - $5,000</MenuItem>
                      <MenuItem value="5000+">More than $5,000</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <Typography variant="body1">{userData?.monthlySpending}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Existing Credit Card Debt
                </Typography>
                {isEditing ? (
                  <FormControl fullWidth>
                    <Select
                      value={editedData?.existingDebt || ''}
                      onChange={handleSelectChange('existingDebt')}
                    >
                      <MenuItem value="no">No debt</MenuItem>
                      <MenuItem value="less-5k">Less than $5,000</MenuItem>
                      <MenuItem value="5k-10k">$5,000 - $10,000</MenuItem>
                      <MenuItem value="more-10k">More than $10,000</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <Typography variant="body1">{userData?.existingDebt}</Typography>
                )}
              </Grid>
            </Grid>

            {isEditing && (
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button variant="contained" onClick={handleSave}>Save Changes</Button>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Credit Cards Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">My Credit Cards</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddCard}
                variant="outlined"
              >
                Add Card
              </Button>
            </Box>

            {creditCards.map((card) => (
              <Card key={card.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CreditCardIcon sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">
                      {card.name} (*{card.lastFourDigits})
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Balance: ${card.balance.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Available Credit: ${card.availableCredit.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rewards: {card.rewardsBalance.toLocaleString()} {card.rewardsType}
                  </Typography>
                </CardContent>
              </Card>
            ))}

            {creditCards.length === 0 && (
              <Alert severity="info">
                No credit cards linked yet. Add your first card to start tracking rewards and balances.
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Add Credit Card Dialog */}
      <Dialog open={isAddingCard} onClose={() => setIsAddingCard(false)}>
        <DialogTitle>Add Credit Card</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Card Name"
              value={newCard.name || ''}
              onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Last 4 Digits"
              value={newCard.lastFourDigits || ''}
              onChange={(e) => setNewCard({ ...newCard, lastFourDigits: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Alert severity="info" sx={{ mb: 2 }}>
              Coming soon: Automatic balance and rewards tracking through bank integration.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddingCard(false)}>Cancel</Button>
          <Button onClick={handleCardSubmit} variant="contained">Add Card</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 