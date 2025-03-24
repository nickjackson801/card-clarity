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
          background: 'rgba(0, 0, 0, 0.03)',
          color: '#1d1d1f',
          py: 1.5,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          margin: 0,
          borderRadius: 0
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 400,
            letterSpacing: '-0.01em',
            fontSize: '14px'
          }}
        >
          Beta Access: Try all features free during our beta period
        </Typography>
        <Button
          variant="contained"
          size="small"
          component={Link}
          to="/auth"
          sx={{
            backgroundColor: '#1d1d1f',
            color: '#ffffff',
            fontSize: '13px',
            py: 0.5,
            px: 2,
            '&:hover': {
              backgroundColor: '#2d2d2f',
            },
          }}
        >
          Try Now
        </Button>
      </Box>
    </motion.div>
  );
};

export default BetaBanner; 