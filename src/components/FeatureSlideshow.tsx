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
        {/* Background Elements */}
        <defs>
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1a237e', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#3949ab', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* Credit Card with Gradient */}
        <rect x="50" y="100" width="300" height="180" rx="10" fill="url(#cardGradient)" />
        <rect x="70" y="140" width="260" height="100" rx="5" fill="#ffffff" />
        {/* Card Details */}
        <text x="70" y="180" fill="#1a237e" fontSize="16" fontFamily="Arial">**** **** **** 1234</text>
        <text x="70" y="220" fill="#1a237e" fontSize="14" fontFamily="Arial">Expires 12/25</text>
        {/* Decorative Elements */}
        <circle cx="300" cy="120" r="30" fill="#ffffff" opacity="0.1" />
        <circle cx="320" cy="140" r="20" fill="#ffffff" opacity="0.1" />
        {/* Comparison Arrows with Animation */}
        <path d="M 200 50 L 200 90" stroke="#1a237e" strokeWidth="4" strokeDasharray="5,5" />
        <path d="M 180 70 L 200 90 L 220 70" stroke="#1a237e" strokeWidth="4" fill="none" />
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
            <stop offset="0%" style={{ stopColor: '#1a237e', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#3949ab', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* Animated Points Circles */}
        <circle cx="200" cy="150" r="100" stroke="url(#pointsGradient)" strokeWidth="8" fill="none" strokeDasharray="5,5">
          <animate attributeName="strokeDashoffset" from="0" to="10" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="150" r="80" stroke="url(#pointsGradient)" strokeWidth="8" fill="none" strokeDasharray="5,5">
          <animate attributeName="strokeDashoffset" from="10" to="0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="150" r="60" stroke="url(#pointsGradient)" strokeWidth="8" fill="none" strokeDasharray="5,5">
          <animate attributeName="strokeDashoffset" from="0" to="10" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Points Text with Shadow */}
        <text x="200" y="160" textAnchor="middle" fill="#1a237e" fontSize="24" fontFamily="Arial" filter="url(#shadow)">
          10,000
        </text>
        <text x="200" y="190" textAnchor="middle" fill="#1a237e" fontSize="16" fontFamily="Arial" filter="url(#shadow)">
          POINTS
        </text>
        {/* Decorative Elements */}
        <circle cx="100" cy="100" r="10" fill="#3949ab" opacity="0.3" />
        <circle cx="300" cy="200" r="15" fill="#3949ab" opacity="0.3" />
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
            <stop offset="0%" style={{ stopColor: '#1a237e', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#3949ab', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* Graph Background */}
        <rect x="40" y="40" width="320" height="220" rx="10" fill="#f5f5f5" />
        {/* Grid Lines */}
        <path d="M 50 250 L 350 250" stroke="#e0e0e0" strokeWidth="1" />
        <path d="M 50 200 L 350 200" stroke="#e0e0e0" strokeWidth="1" />
        <path d="M 50 150 L 350 150" stroke="#e0e0e0" strokeWidth="1" />
        <path d="M 50 100 L 350 100" stroke="#e0e0e0" strokeWidth="1" />
        <path d="M 50 50 L 350 50" stroke="#e0e0e0" strokeWidth="1" />
        {/* Debt Reduction Line */}
        <path d="M 50 250 L 100 200 L 150 180 L 200 150 L 250 120 L 300 100 L 350 80" 
              stroke="url(#graphGradient)" strokeWidth="4" fill="none">
          <animate attributeName="strokeDasharray" from="0,1000" to="1000,0" dur="2s" fill="freeze" />
        </path>
        {/* Data Points */}
        <circle cx="100" cy="200" r="4" fill="#1a237e" />
        <circle cx="150" cy="180" r="4" fill="#1a237e" />
        <circle cx="200" cy="150" r="4" fill="#1a237e" />
        <circle cx="250" cy="120" r="4" fill="#1a237e" />
        <circle cx="300" cy="100" r="4" fill="#1a237e" />
        <circle cx="350" cy="80" r="4" fill="#1a237e" />
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
            <stop offset="0%" style={{ stopColor: '#1a237e', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#3949ab', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="cardGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3949ab', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1a237e', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* Multiple Cards with Gradients */}
        <rect x="50" y="100" width="200" height="120" rx="8" fill="url(#cardGradient1)" />
        <rect x="150" y="80" width="200" height="120" rx="8" fill="url(#cardGradient2)" />
        {/* Rewards Icons with Animation */}
        <circle cx="100" cy="160" r="20" fill="#ffffff">
          <animate attributeName="r" from="18" to="22" dur="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="140" r="20" fill="#ffffff">
          <animate attributeName="r" from="22" to="18" dur="1s" repeatCount="indefinite" />
        </circle>
        <text x="100" y="165" textAnchor="middle" fill="#1a237e" fontSize="14" fontFamily="Arial">2x</text>
        <text x="250" y="145" textAnchor="middle" fill="#1a237e" fontSize="14" fontFamily="Arial">3x</text>
        {/* Decorative Elements */}
        <circle cx="50" cy="50" r="10" fill="#3949ab" opacity="0.3" />
        <circle cx="350" cy="250" r="15" fill="#3949ab" opacity="0.3" />
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
            padding: '2rem',
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