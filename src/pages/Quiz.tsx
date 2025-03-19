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
}

const questions: Question[] = [
  {
    id: 1,
    text: 'What is your primary goal for getting a new credit card?',
    type: 'radio',
    options: [
      'Earn travel rewards',
      'Get cash back',
      'Build credit',
      'Balance transfer',
      'Business expenses'
    ]
  },
  {
    id: 2,
    text: 'What is your average monthly spending?',
    type: 'slider',
    min: 0,
    max: 50000
  },
  {
    id: 3,
    text: 'Which category do you spend the most on?',
    type: 'radio',
    options: [
      'Travel',
      'Dining',
      'Groceries',
      'Gas',
      'Online Shopping',
      'Entertainment'
    ]
  },
  {
    id: 4,
    text: 'Are you willing to pay an annual fee for better rewards?',
    type: 'radio',
    options: [
      'Yes, if the benefits outweigh the cost',
      'No, I prefer no annual fee',
      'Maybe, depending on the amount'
    ]
  },
  {
    id: 5,
    text: 'What is your credit score range?',
    type: 'radio',
    options: [
      'Excellent (750+)',
      'Good (700-749)',
      'Fair (650-699)',
      'Poor (Below 650)',
      'I don\'t know'
    ]
  }
];

const recommendedCards = [
  {
    name: 'Premium Travel Rewards',
    annualFee: 95,
    rewards: '5x on Travel, 3x on Dining',
    welcomeBonus: '75,000 points',
    creditScore: 'Excellent',
    features: ['No foreign transaction fees', 'Airport lounge access', 'Travel insurance']
  },
  {
    name: 'Cash Back Plus',
    annualFee: 0,
    rewards: '2% on all purchases',
    welcomeBonus: '$200 cash back',
    creditScore: 'Good',
    features: ['No annual fee', '0% intro APR', 'Cell phone protection']
  },
  {
    name: 'Secured Builder Card',
    annualFee: 0,
    rewards: '1% on all purchases',
    welcomeBonus: 'None',
    creditScore: 'Fair',
    features: ['No credit check', 'Reports to all credit bureaus', 'Graduate to unsecured card']
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
        <FormControl component="fieldset">
          <FormLabel component="legend">{question.text}</FormLabel>
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
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
    }

    if (question.type === 'slider') {
      return (
        <Box sx={{ width: '100%', mt: 4 }}>
          <Typography gutterBottom>{question.text}</Typography>
          <Slider
            value={answers[question.id] as number || 0}
            onChange={(_, value) => handleAnswer(question.id, value as number)}
            min={question.min}
            max={question.max}
            step={1000}
            valueLabelDisplay="on"
            valueLabelFormat={(value) => `$${value.toLocaleString()}`}
            marks={[
              { value: question.min || 0, label: '$0' },
              { value: (question.max || 0) / 2, label: `$${((question.max || 0) / 2).toLocaleString()}` },
              { value: question.max || 0, label: `$${(question.max || 0).toLocaleString()}` },
            ]}
          />
        </Box>
      );
    }

    return null;
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Find Your Perfect Card
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Answer a few questions to get personalized credit card recommendations.
        </Typography>

        {!showResults ? (
          <Paper sx={{ p: 4, mt: 4 }}>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {questions.map((_, index) => (
                <Step key={index}>
                  <StepLabel></StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ mt: 4 }}>
              {renderQuestion(questions[activeStep])}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
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
            <Typography variant="h4" gutterBottom sx={{ mt: 6, mb: 4 }}>
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