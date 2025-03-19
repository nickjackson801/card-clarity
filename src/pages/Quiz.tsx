import { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Slider,
  Card,
  CardContent,
  Chip,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';

interface Question {
  id: number;
  text: string;
  type: 'radio' | 'slider';
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

const questions: Question[] = [
  {
    id: 1,
    text: 'What is your primary goal for getting a new credit card?',
    type: 'radio',
    options: [
      'Earn travel rewards',
      'Get cash back on purchases',
      'Build or rebuild credit',
      'Transfer existing card balance',
      'Finance a large purchase',
      'Business expenses'
    ]
  },
  {
    id: 2,
    text: 'What is your average monthly spending?',
    type: 'slider',
    min: 0,
    max: 30000,
    step: 100
  },
  {
    id: 3,
    text: 'Which category do you spend the most on monthly?',
    type: 'radio',
    options: [
      'Travel (flights, hotels, car rentals)',
      'Dining and restaurants',
      'Groceries and supermarkets',
      'Gas and transportation',
      'Online shopping',
      'Entertainment',
      'Business services'
    ]
  },
  {
    id: 4,
    text: 'What is your credit score range?',
    type: 'radio',
    options: [
      'Excellent (750+)',
      'Good (700-749)',
      'Fair (650-699)',
      'Poor (Below 650)',
      'I don\'t know my credit score'
    ]
  },
  {
    id: 5,
    text: 'How much are you willing to pay for an annual fee?',
    type: 'radio',
    options: [
      'No annual fee',
      'Up to $95',
      'Up to $250',
      'Up to $550',
      'Any amount if the benefits justify it'
    ]
  },
  {
    id: 6,
    text: 'How often do you travel internationally?',
    type: 'radio',
    options: [
      'Never',
      '1-2 times per year',
      '3-5 times per year',
      'More than 5 times per year',
      'I live or work internationally'
    ]
  },
  {
    id: 7,
    text: 'What type of rewards do you prefer?',
    type: 'radio',
    options: [
      'Cash back - direct deposit or statement credit',
      'Travel points/miles for specific airline or hotel',
      'Flexible points transferable to partners',
      'Store-specific rewards',
      'Simple flat-rate rewards'
    ]
  },
  {
    id: 8,
    text: 'Do you currently carry a balance on any credit cards?',
    type: 'radio',
    options: [
      'No, I pay in full each month',
      'Yes, less than $1,000',
      'Yes, $1,000 - $5,000',
      'Yes, $5,000 - $10,000',
      'Yes, more than $10,000'
    ]
  },
  {
    id: 9,
    text: 'Which additional benefits are most important to you?',
    type: 'radio',
    options: [
      'Travel insurance and protections',
      'Purchase protection and extended warranty',
      'Airport lounge access',
      'Cell phone insurance',
      'Rental car insurance',
      'None - I just want basic rewards'
    ]
  },
  {
    id: 10,
    text: 'How do you primarily use your credit card?',
    type: 'radio',
    options: [
      'Everyday purchases (groceries, gas, etc.)',
      'Large purchases and bills',
      'Travel bookings',
      'Online shopping',
      'Business expenses',
      'Emergency backup only'
    ]
  },
  {
    id: 11,
    text: 'Are you interested in earning a welcome bonus?',
    type: 'radio',
    options: [
      'Yes, willing to spend more to earn it',
      'Yes, but only with normal spending',
      'No, I prefer consistent rewards',
      'Not sure what this means'
    ]
  },
  {
    id: 12,
    text: 'How many credit cards do you currently have?',
    type: 'radio',
    options: [
      'None',
      '1-2 cards',
      '3-5 cards',
      'More than 5 cards'
    ]
  },
  {
    id: 13,
    text: 'What is your employment status?',
    type: 'radio',
    options: [
      'Full-time employed',
      'Part-time employed',
      'Self-employed/Business owner',
      'Student',
      'Retired',
      'Other'
    ]
  }
];

const recommendedCards = [
  {
    name: 'Premium Travel Rewards',
    annualFee: 550,
    rewards: '5x on Travel, 3x on Dining, 1x on other purchases',
    welcomeBonus: '100,000 points ($1,500+ value)',
    creditScore: 'Excellent',
    features: [
      'Priority airport lounge access',
      'Global Entry/TSA PreCheck credit',
      'Annual travel credit',
      'Trip cancellation insurance',
      'No foreign transaction fees',
      'Premium concierge service'
    ]
  },
  {
    name: 'Everyday Cash Back',
    annualFee: 0,
    rewards: '3% groceries, 2% online shopping, 1% everything else',
    welcomeBonus: '$200 cash back',
    creditScore: 'Good',
    features: [
      'No annual fee',
      '0% intro APR for 15 months',
      'Cell phone protection',
      'Extended warranty',
      'Purchase protection'
    ]
  },
  {
    name: 'Balance Transfer Plus',
    annualFee: 0,
    rewards: '1.5% on all purchases',
    welcomeBonus: '0% APR for 21 months on balance transfers',
    creditScore: 'Good',
    features: [
      'No annual fee',
      'Long 0% APR period',
      'Balance transfer fee waived',
      'Free FICO score',
      'Zero liability protection'
    ]
  },
  {
    name: 'Business Rewards Elite',
    annualFee: 295,
    rewards: '4x on business categories, 2x on travel',
    welcomeBonus: '120,000 points',
    creditScore: 'Good to Excellent',
    features: [
      'Free employee cards',
      'Travel insurance',
      'Purchase protection',
      'Expense management tools',
      'No foreign transaction fees'
    ]
  },
  {
    name: 'Student Builder',
    annualFee: 0,
    rewards: '2% on groceries and gas, 1% on other purchases',
    welcomeBonus: '$50 after first purchase',
    creditScore: 'Fair or Limited History',
    features: [
      'No annual fee',
      'Good grades reward',
      'Free credit score',
      'Credit building tools',
      'ID theft protection'
    ]
  },
  {
    name: 'Secured Rebuilder',
    annualFee: 0,
    rewards: '1% on all purchases',
    welcomeBonus: 'None',
    creditScore: 'Poor or Limited History',
    features: [
      'No credit check required',
      'Reports to all credit bureaus',
      'Graduate to unsecured card',
      'Free credit score access',
      'Automatic credit line reviews'
    ]
  },
  {
    name: 'Luxury Travel Elite',
    annualFee: 695,
    rewards: '10x on hotels, 5x on flights, 1x on other purchases',
    welcomeBonus: '150,000 points',
    creditScore: 'Excellent',
    features: [
      'Global lounge collection',
      'Hotel elite status',
      'Airline fee credits',
      'Fine hotels & resorts benefits',
      'Premium concierge',
      'Travel insurance suite'
    ]
  }
];

const Quiz = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleAnswer = (questionId: number, answer: string | number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const renderQuestion = (question: Question) => {
    if (question.type === 'radio') {
      return (
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <FormLabel component="legend" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.1rem' }, fontWeight: 500 }}>
            {question.text}
          </FormLabel>
          <RadioGroup
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
          >
            {question.options?.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
                sx={{ mb: 1, '& .MuiFormControlLabel-label': { fontSize: { xs: '0.9rem', md: '1rem' } } }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
    }

    if (question.type === 'slider') {
      return (
        <Box sx={{ width: '100%', mt: 4 }}>
          <Typography gutterBottom sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.1rem' }, fontWeight: 500 }}>
            {question.text}
          </Typography>
          <Slider
            value={answers[question.id] as number || 0}
            onChange={(_, value) => handleAnswer(question.id, value as number)}
            min={0}
            max={30000}
            step={100}
            valueLabelDisplay="on"
            valueLabelFormat={(value) => `$${value.toLocaleString()}`}
            marks={[
              { value: 0, label: '$0' },
              { value: 5000, label: '$5K' },
              { value: 10000, label: '$10K' },
              { value: 15000, label: '$15K' },
              { value: 20000, label: '$20K' },
              { value: 25000, label: '$25K' },
              { value: 30000, label: '$30K' },
            ]}
            sx={{
              '& .MuiSlider-markLabel': {
                mt: 2,
              },
              '& .MuiSlider-valueLabel': {
                backgroundColor: 'primary.main',
                fontSize: '0.875rem',
                padding: '4px 8px',
              }
            }}
          />
        </Box>
      );
    }

    return null;
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '2.5rem' } }}>
          Find Your Perfect Card
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
          Answer a few questions to get personalized credit card recommendations.
        </Typography>

        {!showResults ? (
          <Paper sx={{ p: { xs: 2, md: 4 }, mt: 4 }}>
            <Stepper 
              activeStep={activeStep} 
              sx={{ 
                mb: 4,
                '& .MuiStep-root': {
                  minWidth: { xs: 'auto', md: '100px' },
                  '& .MuiStepLabel-root': {
                    padding: { xs: '0 4px', md: '0 8px' },
                  }
                }
              }}
              alternativeLabel
            >
              {questions.map((_, index) => (
                <Step key={index}>
                  <StepLabel sx={{ display: { xs: 'none', md: 'block' } }}></StepLabel>
                  <StepLabel sx={{ display: { xs: 'block', md: 'none' } }}>
                    {index + 1}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ mt: 4 }}>
              {renderQuestion(questions[activeStep])}

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mt: 4,
                position: 'sticky',
                bottom: 0,
                bgcolor: 'background.paper',
                py: 2,
                borderTop: '1px solid',
                borderColor: 'divider'
              }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={activeStep === questions.length - 1 ? handleSubmit : handleNext}
                  disabled={!answers[questions[activeStep].id]}
                >
                  {activeStep === questions.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </Box>
          </Paper>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" gutterBottom sx={{ mt: 6, mb: 4, fontSize: { xs: '1.75rem', md: '2rem' } }}>
              Your Recommended Cards
            </Typography>
            <Grid container spacing={3}>
              {recommendedCards.map((card) => (
                <Grid item xs={12} key={card.name}>
                  <Card
                    sx={{
                      background: 'linear-gradient(to bottom right, #ffffff, #f8fafc)',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'transform 0.3s ease-in-out',
                      },
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                          <Typography variant="h5" gutterBottom>
                            {card.name}
                          </Typography>
                          <Typography color="text.secondary" paragraph>
                            {card.rewards}
                          </Typography>
                          <Box sx={{ mb: 2 }}>
                            {card.features.map((feature) => (
                              <Chip
                                key={feature}
                                label={feature}
                                sx={{ mr: 1, mb: 1 }}
                                size="small"
                              />
                            ))}
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="h6" color="primary">
                              {card.welcomeBonus}
                            </Typography>
                            <Typography color="text.secondary">
                              Welcome Bonus
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                              Annual Fee: ${card.annualFee}
                            </Typography>
                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                              Credit Score: {card.creditScore}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        )}
      </motion.div>
    </Container>
  );
};

export default Quiz; 