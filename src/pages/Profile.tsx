import { useEffect, useState } from 'react';
import { Container, Paper, Typography, Box, Avatar, Grid, Divider } from '@mui/material';
import { useFirebase } from '../contexts/FirebaseContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Navigate } from 'react-router-dom';

interface UserData {
  name: string;
  email: string;
  creditExperience: string;
  monthlySpending: string;
  existingDebt: string;
  createdAt: string;
}

const Profile = () => {
  const { user } = useFirebase();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
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
            <Typography variant="h4" sx={{ mb: 1 }}>
              {userData?.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {userData?.email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Credit Card Experience
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {userData?.creditExperience}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Monthly Spending
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {userData?.monthlySpending}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Existing Credit Card Debt
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {userData?.existingDebt}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Member Since
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile; 