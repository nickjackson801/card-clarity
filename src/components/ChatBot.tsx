import { useState, useRef, useEffect } from 'react';
import {
  Box,
  IconButton,
  Paper,
  TextField,
  Typography,
  Drawer,
  List,
  ListItem,
  Divider,
  Link,
} from '@mui/material';
import {
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

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Check for keywords and intent
    const lowerMessage = input.toLowerCase();
    let contextualResponse = '';

    // Price/Beta related keywords
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee') || 
        lowerMessage.includes('subscription') || lowerMessage.includes('paid') || lowerMessage.includes('free')) {
      contextualResponse = "Great news! During our beta period, all features of Card Clarity are completely free. You can access our full suite of tools including card recommendations, points optimization, debt management, and rewards tracking without any cost. Take advantage of this offer while it lasts!";
    }

    // Debt related keywords
    else if (lowerMessage.includes('debt') || lowerMessage.includes('balance') || lowerMessage.includes('pay off') || 
             lowerMessage.includes('interest') || lowerMessage.includes('payment') || lowerMessage.includes('owe')) {
      contextualResponse = "I can help you with debt management! Our debt management tool can help you create a personalized debt payoff strategy. Would you like me to take you to the debt management section?";
    }

    // Points related keywords
    else if (lowerMessage.includes('point') || lowerMessage.includes('reward') || lowerMessage.includes('cashback') || 
             lowerMessage.includes('miles') || lowerMessage.includes('travel') || lowerMessage.includes('redemption')) {
      contextualResponse = "Our points optimization tool can help you maximize your rewards! Would you like to learn more about how to optimize your points and rewards?";
    }

    // Card recommendation keywords
    else if (lowerMessage.includes('card') || lowerMessage.includes('recommend') || lowerMessage.includes('apply') || 
             lowerMessage.includes('credit') || lowerMessage.includes('new card') || lowerMessage.includes('best card')) {
      contextualResponse = "I can help you find the perfect credit card! Our smart card recommendation tool analyzes your spending habits and preferences to suggest cards that match your needs. Would you like to take our card recommendation quiz?";
    }

    // General help keywords
    else if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('what') || 
             lowerMessage.includes('explain') || lowerMessage.includes('guide') || lowerMessage.includes('tutorial')) {
      contextualResponse = "I'm here to help! Card Clarity offers several tools to help you manage your credit cards better:\n\n" +
        "1. Smart Card Recommendations - Find the perfect card for your needs\n" +
        "2. Points Optimization - Maximize your rewards\n" +
        "3. Debt Management - Create a personalized debt payoff strategy\n" +
        "4. Rewards Tracking - Monitor and optimize your rewards\n\n" +
        "What would you like to learn more about?";
    }

    // If no specific keywords are detected, use the default AI response
    if (!contextualResponse) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a helpful AI assistant for Card Clarity, a credit card management platform. You help users with credit card recommendations, points optimization, debt management, and rewards tracking. Be friendly, concise, and focus on providing actionable advice."
              },
              ...messages,
              { role: 'user', content: input }
            ],
            temperature: 0.7,
            max_tokens: 150
          })
        });

        const data = await response.json();
        if (data.choices && data.choices[0]) {
          setMessages((prev) => [...prev, { text: data.choices[0].message.content, isUser: false }]);
        }
      } catch (error) {
        console.error('Error:', error);
        setMessages((prev) => [...prev, { text: "I apologize, but I'm having trouble connecting to the AI service right now. Please try again in a moment.", isUser: false }]);
      }
    } else {
      setMessages((prev) => [...prev, { text: contextualResponse, isUser: false }]);
    }
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 350,
          height: 500,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 1000,
          border: '4px solid #FFD700',
          '&:hover': {
            border: '4px solid #FFA500',
            transition: 'border-color 0.3s ease-in-out'
          }
        }}
      >
        <Box
          sx={{
            p: 2,
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            color: '#1a237e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '3px solid #FFD700',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Card Clarity Assistant
          </Typography>
          <IconButton
            size="small"
            onClick={() => setIsOpen(false)}
            sx={{ color: '#1a237e' }}
          >
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
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(184, 134, 11, 0.05) 100%)'
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
                        : 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
                      color: message.isUser ? 'white' : '#1a237e',
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

        <Box sx={{ p: 2, display: 'flex', gap: 1, background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(184, 134, 11, 0.05) 100%)' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#FFD700',
                },
              },
            }}
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            sx={{
              background: 'linear-gradient(45deg, #FFD700 30%, #B8860B 90%)',
              color: '#1a237e',
              '&:hover': {
                background: 'linear-gradient(45deg, #B8860B 30%, #FFD700 90%)',
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
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
                          : 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
                        color: message.isUser ? 'white' : '#1a237e',
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

          <Box sx={{ p: 2, display: 'flex', gap: 1, background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(184, 134, 11, 0.05) 100%)' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#FFD700',
                  },
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              sx={{
                background: 'linear-gradient(45deg, #FFD700 30%, #B8860B 90%)',
                color: '#1a237e',
                '&:hover': {
                  background: 'linear-gradient(45deg, #B8860B 30%, #FFD700 90%)',
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