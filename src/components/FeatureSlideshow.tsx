import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=1200',
    title: 'Smart Card Recommendations',
    description: 'Get personalized credit card suggestions based on your spending habits and financial goals.'
  },
  {
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200',
    title: 'Points Optimization',
    description: 'Maximize your rewards with our intelligent points optimization system.'
  },
  {
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1200',
    title: 'Debt Management',
    description: 'Take control of your credit card debt with personalized payoff strategies.'
  },
  {
    image: 'https://images.unsplash.com/photo-1556742396-9c8a0a7232a3?auto=format&fit=crop&q=80&w=1200',
    title: 'Rewards Tracking',
    description: 'Track and manage your rewards across multiple cards in one place.'
  }
];

const FeatureSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Box sx={{ 
      width: '100%', 
      height: { xs: '300px', md: '400px' },
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 2,
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
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
            backgroundImage: imageError ? 'none' : `url(${slides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: imageError ? '#f5f5f5' : 'transparent',
          }}
        >
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
        </motion.div>
      </AnimatePresence>
      
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