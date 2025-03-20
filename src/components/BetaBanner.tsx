import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BetaBanner = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          width: '100%',
          background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
          color: 'white',
          py: 1,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          🎉 Welcome to Card Clarity Beta! All features are free during our beta period.
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate('/auth')}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Sign Up Now
        </Button>
      </Box>
    </motion.div>
  );
};

export default BetaBanner; 