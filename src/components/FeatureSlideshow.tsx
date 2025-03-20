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
        <defs>
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#4CAF50', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#2196F3', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
          </filter>
        </defs>
        {/* Smart Card Recommendations */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Card */}
          <motion.rect
            x="50"
            y="0"
            width="300"
            height="180"
            rx="10"
            fill="url(#cardGradient)"
            filter="url(#shadow)"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          {/* Card Chip */}
          <motion.rect
            x="70"
            y="20"
            width="40"
            height="30"
            rx="4"
            fill="#FFD700"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          {/* Card Number */}
          <motion.text
            x="70"
            y="70"
            fill="#1a237e"
            fontSize="16"
            fontFamily="Arial"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            **** **** **** 1234
          </motion.text>
          {/* Card Holder */}
          <motion.text
            x="70"
            y="100"
            fill="#1a237e"
            fontSize="14"
            fontFamily="Arial"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            CARD HOLDER
          </motion.text>
          {/* Expiry */}
          <motion.text
            x="70"
            y="120"
            fill="#1a237e"
            fontSize="14"
            fontFamily="Arial"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Expires 12/25
          </motion.text>
          {/* Decorative Elements */}
          <motion.circle
            cx="300"
            cy="20"
            r="30"
            fill="#FFD700"
            opacity="0.3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          />
          <motion.circle
            cx="320"
            cy="40"
            r="20"
            fill="#FFD700"
            opacity="0.3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
          {/* Smart Recommendation Icon */}
          <motion.path
            d="M200,-30 L220,-10 L200,10 L180,-10 Z"
            fill="#FFD700"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
          {/* Recommendation Lines */}
          <motion.path
            d="M200,30 L200,70"
            stroke="#FFD700"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <animate attributeName="strokeDashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
          </motion.path>
        </motion.g>
      </svg>
    ),
    title: 'Smart Card Recommendations',
    description: 'Get personalized credit card suggestions based on your spending habits and financial goals.'
  },
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pointsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#9C27B0', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#2196F3', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
          </filter>
        </defs>
        {/* Points Optimization */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated Points Circles */}
          <motion.circle 
            cx="200" 
            cy="120" 
            r="100" 
            stroke="#FFD700" 
            strokeWidth="2" 
            fill="none" 
            strokeDasharray="5,5"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <animate attributeName="strokeDashoffset" from="0" to="10" dur="2s" repeatCount="indefinite" />
          </motion.circle>
          <motion.circle 
            cx="200" 
            cy="120" 
            r="80" 
            stroke="#FFD700" 
            strokeWidth="2" 
            fill="none" 
            strokeDasharray="5,5"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <animate attributeName="strokeDashoffset" from="10" to="0" dur="2s" repeatCount="indefinite" />
          </motion.circle>
          <motion.circle 
            cx="200" 
            cy="120" 
            r="60" 
            stroke="#FFD700" 
            strokeWidth="2" 
            fill="none" 
            strokeDasharray="5,5"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <animate attributeName="strokeDashoffset" from="0" to="10" dur="2s" repeatCount="indefinite" />
          </motion.circle>
          {/* Points Text with Shadow */}
          <motion.text 
            x="200" 
            y="130" 
            textAnchor="middle" 
            fill="#1a237e" 
            fontSize="24" 
            fontFamily="Arial" 
            filter="url(#shadow)"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            100,000
          </motion.text>
          <motion.text 
            x="200" 
            y="160" 
            textAnchor="middle" 
            fill="#1a237e" 
            fontSize="16" 
            fontFamily="Arial" 
            filter="url(#shadow)"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            POINTS
          </motion.text>
          {/* Decorative Elements */}
          <motion.circle 
            cx="150" 
            cy="70" 
            r="20" 
            fill="#FFD700" 
            opacity="0.3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <animate attributeName="r" from="18" to="22" dur="1s" repeatCount="indefinite" />
          </motion.circle>
          <motion.circle 
            cx="250" 
            cy="170" 
            r="15" 
            fill="#FFD700" 
            opacity="0.3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <animate attributeName="r" from="12" to="18" dur="1s" repeatCount="indefinite" />
          </motion.circle>
        </motion.g>
      </svg>
    ),
    title: 'Points Optimization',
    description: 'Maximize your rewards with our intelligent points optimization system.'
  },
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="graphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#4CAF50', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#9C27B0', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
          </filter>
        </defs>
        {/* Debt Management */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Graph Background */}
          <motion.rect 
            x="40" 
            y="40" 
            width="320" 
            height="180" 
            rx="10" 
            fill="#f5f5f5" 
            filter="url(#shadow)"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          {/* Grid Lines */}
          <motion.path 
            d="M 50 210 L 350 210" 
            stroke="#e0e0e0" 
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.path 
            d="M 50 170 L 350 170" 
            stroke="#e0e0e0" 
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <motion.path 
            d="M 50 130 L 350 130" 
            stroke="#e0e0e0" 
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
          <motion.path 
            d="M 50 90 L 350 90" 
            stroke="#e0e0e0" 
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
          <motion.path 
            d="M 50 50 L 350 50" 
            stroke="#e0e0e0" 
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          />
          {/* Debt Reduction Line */}
          <motion.path 
            d="M 50 210 L 100 170 L 150 150 L 200 130 L 250 110 L 300 90 L 350 70" 
            stroke="url(#graphGradient)" 
            strokeWidth="4" 
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          >
            <animate attributeName="strokeDasharray" from="0,1000" to="1000,0" dur="2s" fill="freeze" />
          </motion.path>
          {/* Data Points */}
          <motion.circle 
            cx="100" 
            cy="170" 
            r="4" 
            fill="#4CAF50" 
            filter="url(#shadow)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          />
          <motion.circle 
            cx="150" 
            cy="150" 
            r="4" 
            fill="#4CAF50" 
            filter="url(#shadow)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          />
          <motion.circle 
            cx="200" 
            cy="130" 
            r="4" 
            fill="#4CAF50" 
            filter="url(#shadow)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 1.0 }}
          />
          <motion.circle 
            cx="250" 
            cy="110" 
            r="4" 
            fill="#4CAF50" 
            filter="url(#shadow)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 1.1 }}
          />
          <motion.circle 
            cx="300" 
            cy="90" 
            r="4" 
            fill="#4CAF50" 
            filter="url(#shadow)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 1.2 }}
          />
          <motion.circle 
            cx="350" 
            cy="70" 
            r="4" 
            fill="#4CAF50" 
            filter="url(#shadow)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 1.3 }}
          />
        </motion.g>
      </svg>
    ),
    title: 'Debt Management',
    description: 'Take control of your credit card debt with personalized payoff strategies.'
  },
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cardGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2196F3', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#4CAF50', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="cardGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#9C27B0', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#2196F3', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
          </filter>
        </defs>
        {/* Rewards Tracking */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Multiple Cards with Gradients */}
          <motion.rect 
            x="50" 
            y="50" 
            width="200" 
            height="120" 
            rx="8" 
            fill="url(#cardGradient1)" 
            filter="url(#shadow)"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.rect 
            x="150" 
            y="30" 
            width="200" 
            height="120" 
            rx="8" 
            fill="url(#cardGradient2)" 
            filter="url(#shadow)"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          {/* Rewards Icons with Animation */}
          <motion.circle 
            cx="100" 
            cy="110" 
            r="20" 
            fill="#ffffff" 
            filter="url(#shadow)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <animate attributeName="r" from="18" to="22" dur="1s" repeatCount="indefinite" />
          </motion.circle>
          <motion.circle 
            cx="250" 
            cy="90" 
            r="20" 
            fill="#ffffff" 
            filter="url(#shadow)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <animate attributeName="r" from="22" to="18" dur="1s" repeatCount="indefinite" />
          </motion.circle>
          <motion.text 
            x="100" 
            y="115" 
            textAnchor="middle" 
            fill="#1a237e" 
            fontSize="14" 
            fontFamily="Arial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            2x
          </motion.text>
          <motion.text 
            x="250" 
            y="95" 
            textAnchor="middle" 
            fill="#1a237e" 
            fontSize="14" 
            fontFamily="Arial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            3x
          </motion.text>
          {/* Decorative Elements */}
          <motion.circle 
            cx="50" 
            cy="20" 
            r="10" 
            fill="#9C27B0" 
            opacity="0.3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <animate attributeName="r" from="8" to="12" dur="1s" repeatCount="indefinite" />
          </motion.circle>
          <motion.circle 
            cx="350" 
            cy="220" 
            r="15" 
            fill="#4CAF50" 
            opacity="0.3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <animate attributeName="r" from="12" to="18" dur="1s" repeatCount="indefinite" />
          </motion.circle>
        </motion.g>
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
      bgcolor: '#f8f9fa'
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
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 1
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
          zIndex: 2
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
          zIndex: 2
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