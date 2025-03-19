import { useState } from 'react';
import {
  Box,
  IconButton,
  Paper,
  TextField,
  Typography,
  Fab,
  Drawer,
  List,
  ListItem,
  Divider,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  text: string;
  isUser: boolean;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm your Card Clarity assistant. How can I help you today?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(input);
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
    }, 1000);
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Card comparison related questions
    if (input.includes('compare') || input.includes('card') || input.includes('recommend')) {
      return "I can help you compare credit cards! We analyze your spending habits and preferences to recommend the best cards for you. Would you like to take our quick quiz to get personalized recommendations?";
    }
    
    // Points optimization related questions
    if (input.includes('point') || input.includes('reward') || input.includes('cashback')) {
      return "Our points optimization tool helps you maximize your rewards. You can track points across multiple cards and find the best redemption options. Would you like to learn more about how to optimize your points?";
    }
    
    // Debt management related questions
    if (input.includes('debt') || input.includes('payoff') || input.includes('balance')) {
      return "We offer personalized debt management strategies. You can create a payoff plan, compare different methods, and track your progress. Would you like to explore our debt management tools?";
    }
    
    // General questions about the service
    if (input.includes('what') || input.includes('how') || input.includes('help')) {
      return "Card Clarity is your all-in-one platform for making smarter credit card decisions. We offer card comparison, points optimization, and debt management tools. What specific aspect would you like to learn more about?";
    }
    
    // Pricing or cost related questions
    if (input.includes('cost') || input.includes('price') || input.includes('free')) {
      return "Card Clarity is currently in beta, and all features are free to use! We want to help you make better credit card decisions without any cost. Would you like to sign up and start using our tools?";
    }
    
    // Default response
    return "I'm here to help you with any questions about credit cards, rewards, or debt management. Feel free to ask anything specific!";
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        onClick={() => setIsOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(45deg, #2563eb 30%, #60a5fa 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #1d4ed8 30%, #3b82f6 90%)',
          },
        }}
      >
        <ChatIcon />
      </Fab>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            maxWidth: '100%',
          },
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Card Clarity Assistant
            </Typography>
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <ListItem
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: message.isUser ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        maxWidth: '80%',
                        background: message.isUser
                          ? 'linear-gradient(45deg, #2563eb 30%, #60a5fa 90%)'
                          : 'grey.100',
                        color: message.isUser ? 'white' : 'text.primary',
                      }}
                    >
                      <Typography variant="body1">{message.text}</Typography>
                    </Paper>
                  </ListItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>

          <Divider />

          <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              sx={{
                background: 'linear-gradient(45deg, #2563eb 30%, #60a5fa 90%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1d4ed8 30%, #3b82f6 90%)',
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatBot; 