import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  svg: React.ReactNode;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Credit Card */}
        <rect x="50" y="100" width="300" height="180" rx="10" fill="#1a237e" />
        <rect x="70" y="140" width="260" height="100" rx="5" fill="#ffffff" />
        <text x="70" y="180" fill="#1a237e" fontSize="16" fontFamily="Arial">**** **** **** 1234</text>
        <text x="70" y="220" fill="#1a237e" fontSize="14" fontFamily="Arial">Expires 12/25</text>
        {/* Comparison Arrows */}
        <path d="M 200 50 L 200 90" stroke="#1a237e" strokeWidth="4" />
        <path d="M 180 70 L 200 90 L 220 70" stroke="#1a237e" strokeWidth="4" fill="none" />
      </svg>
    ),
    title: 'Smart Card Recommendations',
    description: 'Get personalized credit card suggestions based on your spending habits and financial goals.'
  },
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Points Circle */}
        <circle cx="200" cy="150" r="100" stroke="#1a237e" strokeWidth="8" fill="none" />
        <circle cx="200" cy="150" r="80" stroke="#1a237e" strokeWidth="8" fill="none" />
        <circle cx="200" cy="150" r="60" stroke="#1a237e" strokeWidth="8" fill="none" />
        {/* Points Text */}
        <text x="200" y="160" textAnchor="middle" fill="#1a237e" fontSize="24" fontFamily="Arial">10,000</text>
        <text x="200" y="190" textAnchor="middle" fill="#1a237e" fontSize="16" fontFamily="Arial">POINTS</text>
      </svg>
    ),
    title: 'Points Optimization',
    description: 'Maximize your rewards with our intelligent points optimization system.'
  },
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Debt Graph */}
        <path d="M 50 250 L 350 250" stroke="#1a237e" strokeWidth="2" />
        <path d="M 50 250 L 50 50" stroke="#1a237e" strokeWidth="2" />
        <path d="M 50 250 L 100 200 L 150 180 L 200 150 L 250 120 L 300 100 L 350 80" 
              stroke="#1a237e" strokeWidth="4" fill="none" />
        {/* Debt Text */}
        <text x="200" y="40" textAnchor="middle" fill="#1a237e" fontSize="20" fontFamily="Arial">Debt Reduction Plan</text>
      </svg>
    ),
    title: 'Debt Management',
    description: 'Take control of your credit card debt with personalized payoff strategies.'
  },
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Multiple Cards */}
        <rect x="50" y="100" width="200" height="120" rx="8" fill="#1a237e" />
        <rect x="150" y="80" width="200" height="120" rx="8" fill="#1a237e" />
        {/* Rewards Icons */}
        <circle cx="100" cy="160" r="20" fill="#ffffff" />
        <circle cx="250" cy="140" r="20" fill="#ffffff" />
        <text x="100" y="165" textAnchor="middle" fill="#1a237e" fontSize="14" fontFamily="Arial">2x</text>
        <text x="250" y="145" textAnchor="middle" fill="#1a237e" fontSize="14" fontFamily="Arial">3x</text>
      </svg>
    ),
    title: 'Rewards Tracking',
    description: 'Track and manage your rewards across multiple cards in one place.'
  }
];

const FeatureSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ 
      width: '100%', 
      height: { xs: '300px', md: '400px' },
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 2,
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      bgcolor: '#f5f5f5'
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          {slides[currentSlide].svg}
        </motion.div>
      </AnimatePresence>
      
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 3,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          color: 'white',
        }}
      >
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          {slides[currentSlide].title}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          {slides[currentSlide].description}
        </Typography>
      </Box>
      
      {/* Slide indicators */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          display: 'flex',
          gap: 1,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
              transition: 'background-color 0.3s',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'white',
              },
            }}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FeatureSlideshow; 