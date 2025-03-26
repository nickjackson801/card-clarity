import { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import { useFirebase } from '../contexts/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

interface UserData {
  name: string;
  email: string;
  creditExperience: string;
  monthlySpending: string;
}

export const UserProfile = () => {
  const { user, logout } = useFirebase();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      handleClose();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!user || !userData) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleClick}>
      <Avatar sx={{ 
        width: 32, 
        height: 32, 
        bgcolor: 'primary.main',
        color: 'white',
        marginRight: 1,
        fontSize: '1rem'
      }}>
        {userData.name.charAt(0).toUpperCase()}
      </Avatar>
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {userData.name}
      </Typography>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}; 