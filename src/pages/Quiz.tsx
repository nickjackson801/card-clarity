import { Container, Typography, Paper, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: 'spending',
      question: 'What is your primary spending category?',
      options: ['Travel', 'Dining', 'Groceries', 'Gas', 'Shopping'],
    },
    {
      id: 'creditScore',
      question: 'What is your credit score range?',
      options: ['Excellent (750+)', 'Good (700-749)', 'Fair (650-699)', 'Poor (<650)'],
    },
    {
      id: 'annualFee',
      question: 'Are you willing to pay an annual fee for better rewards?',
      options: ['Yes, for better benefits', 'No, prefer no annual fee'],
    },
    {
      id: 'rewards',
      question: 'What type of rewards do you prefer?',
      options: ['Cash Back', 'Travel Miles', 'Points', 'Store Rewards'],
    },
  ];

  const handleAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: event.target.value,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/compare', { state: { quizAnswers: answers } });
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: { xs: '2rem', md: '2.5rem' },
            letterSpacing: '-0.025em',
            mb: 2,
            textAlign: 'center'
          }}
        >
          Find Your Perfect Card
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(0, 0, 0, 0.65)',
            fontSize: '1.125rem',
            letterSpacing: '-0.01em',
            mb: 6,
            textAlign: 'center',
            maxWidth: '42rem',
            mx: 'auto'
          }}
        >
          Answer a few questions to help us recommend the best credit cards for your needs.
        </Typography>

        <Box sx={{ position: 'relative', mb: 6 }}>
          <Box
            sx={{
              height: '4px',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              borderRadius: '2px',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '4px',
              width: `${progress}%`,
              backgroundColor: '#1d1d1f',
              borderRadius: '2px',
              transition: 'width 0.3s ease',
            }}
          />
          <Typography
            sx={{
              color: 'rgba(0, 0, 0, 0.45)',
              fontSize: '0.875rem',
              letterSpacing: '-0.01em',
              mt: 1,
              textAlign: 'right',
            }}
          >
            Question {currentQuestion + 1} of {questions.length}
          </Typography>
        </Box>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Paper
            sx={{
              p: 4,
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                letterSpacing: '-0.025em',
                color: '#1d1d1f',
                mb: 4
              }}
            >
              {questions[currentQuestion].question}
            </Typography>

            <FormControl component="fieldset">
              <RadioGroup
                value={answers[questions[currentQuestion].id] || ''}
                onChange={handleAnswer}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {questions[currentQuestion].options.map((option) => (
                    <Paper
                      key={option}
                      elevation={0}
                      sx={{
                        backgroundColor: answers[questions[currentQuestion].id] === option
                          ? 'rgba(0, 0, 0, 0.05)'
                          : 'rgba(0, 0, 0, 0.02)',
                        borderRadius: 2,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                      }}
                    >
                      <FormControlLabel
                        value={option}
                        control={
                          <Radio
                            sx={{
                              color: 'rgba(0, 0, 0, 0.45)',
                              '&.Mui-checked': {
                                color: '#1d1d1f',
                              },
                            }}
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              fontSize: '0.9375rem',
                              letterSpacing: '-0.01em',
                              color: '#1d1d1f',
                            }}
                          >
                            {option}
                          </Typography>
                        }
                        sx={{
                          m: 0,
                          p: 2,
                          width: '100%',
                        }}
                      />
                    </Paper>
                  ))}
                </Box>
              </RadioGroup>
            </FormControl>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                disabled={currentQuestion === 0}
                sx={{
                  color: '#06c',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 102, 204, 0.05)',
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(0, 0, 0, 0.26)',
                  },
                }}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[questions[currentQuestion].id]}
                variant="contained"
                sx={{
                  backgroundColor: '#1d1d1f',
                  color: '#ffffff',
                  py: 1,
                  px: 4,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '0.9375rem',
                  letterSpacing: '-0.01em',
                  '&:hover': {
                    backgroundColor: '#000000',
                  },
                  '&.Mui-disabled': {
                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                    color: 'rgba(0, 0, 0, 0.26)',
                  },
                }}
              >
                {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Quiz; 