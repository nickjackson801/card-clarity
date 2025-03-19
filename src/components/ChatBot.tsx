import { useState, useRef, useEffect } from 'react';
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
  Link,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Message {
  text: string;
  isUser: boolean;
  link?: {
    text: string;
    path: string;
  };
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLinkClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(input);
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  const generateResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    
    // Card comparison related questions
    if (input.includes('compare') || input.includes('card') || input.includes('recommend')) {
      return {
        text: "I can help you compare credit cards! We analyze your spending habits and preferences to recommend the best cards for you.",
        isUser: false,
        link: {
          text: "Take our quick quiz to get personalized recommendations",
          path: "/quiz"
        }
      };
    }
    
    // Points optimization related questions
    if (input.includes('point') || input.includes('reward') || input.includes('cashback')) {
      return {
        text: "Our points optimization tool helps you maximize your rewards. You can track points across multiple cards and find the best redemption options.",
        isUser: false,
        link: {
          text: "Learn more about points optimization",
          path: "/points"
        }
      };
    }
    
    // Debt management related questions
    if (input.includes('debt') || input.includes('payoff') || input.includes('balance')) {
      return {
        text: "We offer personalized debt management strategies. You can create a payoff plan, compare different methods, and track your progress.",
        isUser: false,
        link: {
          text: "Explore our debt management tools",
          path: "/debt"
        }
      };
    }
    
    // General questions about the service
    if (input.includes('what') || input.includes('how') || input.includes('help')) {
      return {
        text: "Card Clarity is your all-in-one platform for making smarter credit card decisions. We offer card comparison, points optimization, and debt management tools.",
        isUser: false,
        link: {
          text: "Learn more about our features",
          path: "/"
        }
      };
    }
    
    // Pricing or cost related questions
    if (input.includes('cost') || input.includes('price') || input.includes('free')) {
      return {
        text: "Card Clarity is currently in beta, and all features are free to use! We want to help you make better credit card decisions without any cost.",
        isUser: false,
        link: {
          text: "Sign up now",
          path: "/auth"
        }
      };
    }
    
    // Default response
    return {
      text: "I'm here to help you with any questions about credit cards, rewards, or debt management. Feel free to ask anything specific!",
      isUser: false
    };
  };

  return (
    <>
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Paper
          elevation={3}
          sx={{
            p: 1.5,
            background: 'linear-gradient(45deg, #2563eb 30%, #60a5fa 90%)',
            color: 'white',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 1,
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 100%': {
                transform: 'translateY(0)',
              },
              '50%': {
                transform: 'translateY(-5px)',
              },
            },
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Ask me anything about credit cards!
          </Typography>
        </Paper>
        <Fab
          color="primary"
          aria-label="chat"
          onClick={() => setIsOpen(true)}
          sx={{
            background: 'linear-gradient(45deg, #2563eb 30%, #60a5fa 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1d4ed8 30%, #3b82f6 90%)',
            },
          }}
        >
          <ChatIcon />
        </Fab>
      </Box>

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
                      {message.link && (
                        <Box sx={{ mt: 1 }}>
                          <Link
                            component="button"
                            onClick={() => handleLinkClick(message.link!.path)}
                            sx={{
                              color: message.isUser ? 'white' : 'primary.main',
                              textDecoration: 'underline',
                              '&:hover': {
                                color: message.isUser ? 'white' : 'primary.dark',
                              },
                            }}
                          >
                            {message.link.text}
                          </Link>
                        </Box>
                      )}
                    </Paper>
                  </ListItem>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
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