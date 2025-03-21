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
  Fab,
} from '@mui/material';
import {
  Close as CloseIcon,
  Send as SendIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
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
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and typing
    await new Promise(resolve => setTimeout(resolve, 1500));

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
      const aiResponse: Message = {
        text: "I can help you with debt management! Our debt management tool can help you create a personalized debt payoff strategy.",
        isUser: false,
        timestamp: new Date(),
        link: {
          text: "Go to Debt Management Tool",
          path: "/debt-management"
        }
      };
      setMessages((prev) => [...prev, aiResponse]);
    }

    // Points related keywords
    else if (lowerMessage.includes('point') || lowerMessage.includes('reward') || lowerMessage.includes('cashback') || 
             lowerMessage.includes('miles') || lowerMessage.includes('travel') || lowerMessage.includes('redemption')) {
      const aiResponse: Message = {
        text: "Our points optimization tool can help you maximize your rewards! I can show you how to get the most value from your points and rewards.",
        isUser: false,
        timestamp: new Date(),
        link: {
          text: "Go to Points Optimization",
          path: "/points-optimization"
        }
      };
      setMessages((prev) => [...prev, aiResponse]);
    }

    // Card recommendation keywords
    else if (lowerMessage.includes('card') || lowerMessage.includes('recommend') || lowerMessage.includes('apply') || 
             lowerMessage.includes('credit') || lowerMessage.includes('new card') || lowerMessage.includes('best card')) {
      const aiResponse: Message = {
        text: "I can help you find the perfect credit card! Our smart card recommendation tool analyzes your spending habits and preferences to suggest cards that match your needs.",
        isUser: false,
        timestamp: new Date(),
        link: {
          text: "Take the Card Recommendation Quiz",
          path: "/card-comparison"
        }
      };
      setMessages((prev) => [...prev, aiResponse]);
    }

    // General help keywords
    else if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('what') || 
             lowerMessage.includes('explain') || lowerMessage.includes('guide') || lowerMessage.includes('tutorial')) {
      const aiResponse: Message = {
        text: "I'm here to help! Card Clarity offers several tools to help you manage your credit cards better:\n\n" +
          "1. Smart Card Recommendations - Find the perfect card for your needs\n" +
          "2. Points Optimization - Maximize your rewards\n" +
          "3. Debt Management - Create a personalized debt payoff strategy\n" +
          "4. Rewards Tracking - Monitor and optimize your rewards\n\n" +
          "Click any of the links below to explore our tools:",
        isUser: false,
        timestamp: new Date(),
        link: {
          text: "View All Tools",
          path: "/"
        }
      };
      setMessages((prev) => [...prev, aiResponse]);
      
      // Add additional messages with specific links
      const toolLinks: Message[] = [
        {
          text: "Find your perfect credit card with our recommendation tool.",
          isUser: false,
          timestamp: new Date(),
          link: {
            text: "Card Recommendations",
            path: "/card-comparison"
          }
        },
        {
          text: "Optimize your rewards and points earning.",
          isUser: false,
          timestamp: new Date(),
          link: {
            text: "Points Optimization",
            path: "/points-optimization"
          }
        },
        {
          text: "Create a personalized debt payoff strategy.",
          isUser: false,
          timestamp: new Date(),
          link: {
            text: "Debt Management",
            path: "/debt-management"
          }
        }
      ];
      
      // Add each tool link with a slight delay
      toolLinks.forEach((message, index) => {
        setTimeout(() => {
          setMessages((prev) => [...prev, message]);
        }, (index + 1) * 500);
      });
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
          const aiResponse: Message = {
            text: data.choices[0].message.content,
            isUser: false,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiResponse]);
        }
      } catch (error) {
        console.error('Error:', error);
        const aiResponse: Message = {
          text: "I apologize, but I'm having trouble connecting to the AI service right now. Please try again in a moment.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }
    } else {
      const aiResponse: Message = {
        text: contextualResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }
    setIsTyping(false);
  };

  return (
    <>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            bottom: 80,
            right: 20,
            background: '#FFD700',
            padding: '8px 16px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 1000,
            animation: 'float 2.5s ease-in-out infinite'
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#1a237e',
              fontWeight: 500,
              textAlign: 'center'
            }}
          >
            Ask me anything about credit cards!
          </Typography>
        </motion.div>
      )}

      <Fab
        color="primary"
        aria-label="chat"
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          bgcolor: '#FFD700',
          '&:hover': {
            bgcolor: '#FFA500'
          }
        }}
      >
        <ChatIcon />
      </Fab>

      <Box
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 16,
          width: '300px',
          height: '400px',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          border: '4px solid #FFD700',
          transition: 'border-color 0.3s ease',
          '&:hover': {
            borderColor: '#FFA500'
          }
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: '3px solid #FFD700',
            bgcolor: '#1a237e',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Typography variant="h6">AI Assistant</Typography>
          <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                p: 1,
                bgcolor: message.isUser ? '#1a237e' : '#f5f5f5',
                color: message.isUser ? 'white' : 'text.primary',
                borderRadius: 2,
                boxShadow: 1
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{message.text}</Typography>
              {message.link && (
                <Box sx={{ mt: 1 }}>
                  <Link
                    component="button"
                    onClick={() => handleLinkClick(message.link!.path)}
                    sx={{
                      color: message.isUser ? 'white' : '#1a237e',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      bgcolor: message.isUser ? 'rgba(255,255,255,0.1)' : '#FFD700',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: message.isUser ? 'rgba(255,255,255,0.2)' : '#FFA500',
                      }
                    }}
                  >
                    {message.link.text}
                  </Link>
                </Box>
              )}
            </Box>
          ))}
          {isTyping && (
            <Box
              sx={{
                alignSelf: 'flex-start',
                maxWidth: '80%',
                p: 1,
                bgcolor: '#f5f5f5',
                borderRadius: 2,
                boxShadow: 1,
                display: 'flex',
                gap: 0.5
              }}
            >
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                •
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              >
                •
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              >
                •
              </motion.span>
            </Box>
          )}
        </Box>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              p: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              gap: 1
            }}
          >
            <TextField
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              variant="outlined"
            />
            <IconButton 
              type="submit" 
              color="primary"
              sx={{ 
                bgcolor: '#FFD700',
                '&:hover': {
                  bgcolor: '#FFA500'
                }
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </form>
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
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          mt: 0.5,
                          color: message.isUser ? '#1a237e' : 'text.secondary',
                        }}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </Typography>
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
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
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
              onClick={(e) => handleSubmit(e)}
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