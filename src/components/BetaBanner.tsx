import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BetaBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          width: '100%',
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          color: '#1a237e',
          py: 1,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          margin: 0,
          borderRadius: 0
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          🎉 Beta Access: All features are free during our beta period!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          component={Link}
          to="/auth"
          sx={{
            backgroundColor: '#1a237e',
            color: '#FFD700',
            '&:hover': {
              backgroundColor: '#0d47a1',
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