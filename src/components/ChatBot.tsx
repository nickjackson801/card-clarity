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
    const currentInput = input;
    setInput('');
    
    // Show typing indicator
    setIsTyping(true);

    try {
      // Add a small delay to show the typing indicator
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check for keywords and intent
      const lowerMessage = currentInput.toLowerCase();
      let aiResponse: Message | null = null;

      // Compare cards keywords
      if (lowerMessage.includes('compare')) {
        aiResponse = {
          text: "I can help you compare different credit cards side by side. Our comparison tool makes it easy to evaluate features, rewards, and benefits of multiple cards.",
          isUser: false,
          timestamp: new Date(),
          link: {
            text: "Go to Card Comparison",
            path: "/compare"
          }
        };
      }

      // Price/Beta related keywords
      else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee') || 
               lowerMessage.includes('subscription') || lowerMessage.includes('paid') || lowerMessage.includes('free')) {
        aiResponse = {
          text: "Great news! During our beta period, all features of Card Clarity are completely free. You can access our full suite of tools including card recommendations, points optimization, debt management, and rewards tracking without any cost. Take advantage of this offer while it lasts!",
          isUser: false,
          timestamp: new Date(),
        };
      }

      // Debt related keywords
      else if (lowerMessage.includes('debt') || lowerMessage.includes('balance') || lowerMessage.includes('pay off') || 
               lowerMessage.includes('interest') || lowerMessage.includes('payment') || lowerMessage.includes('owe')) {
        aiResponse = {
          text: "I can help you with debt management! Our debt management tool can help you create a personalized debt payoff strategy.",
          isUser: false,
          timestamp: new Date(),
          link: {
            text: "Go to Debt Management Tool",
            path: "/debt"
          }
        };
      }

      // Points related keywords
      else if (lowerMessage.includes('point') || lowerMessage.includes('reward') || lowerMessage.includes('cashback') || 
               lowerMessage.includes('miles') || lowerMessage.includes('travel') || lowerMessage.includes('redemption')) {
        aiResponse = {
          text: "Our points optimization tool can help you maximize your rewards! I can show you how to get the most value from your points and rewards.",
          isUser: false,
          timestamp: new Date(),
          link: {
            text: "Go to Points Optimization",
            path: "/points"
          }
        };
      }

      // Card recommendation keywords
      else if (lowerMessage.includes('card') || lowerMessage.includes('recommend') || lowerMessage.includes('apply') || 
               lowerMessage.includes('credit') || lowerMessage.includes('new card') || lowerMessage.includes('best card')) {
        aiResponse = {
          text: "I can help you find the perfect credit card! Our smart card recommendation tool analyzes your spending habits and preferences to suggest cards that match your needs.",
          isUser: false,
          timestamp: new Date(),
          link: {
            text: "Take the Card Recommendation Quiz",
            path: "/quiz"
          }
        };
      }

      // General help keywords
      else if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('what') || 
               lowerMessage.includes('explain') || lowerMessage.includes('guide') || lowerMessage.includes('tutorial')) {
        aiResponse = {
          text: "I'm here to help! Card Clarity offers several tools to help you manage your credit cards better:\n\n" +
            "1. Smart Card Recommendations - Find the perfect card for your needs\n" +
            "2. Points Optimization - Maximize your rewards\n" +
            "3. Debt Management - Create a personalized debt payoff strategy\n" +
            "4. Rewards Tracking - Monitor and optimize your rewards\n\n" +
            "What would you like to learn more about?",
          isUser: false,
          timestamp: new Date(),
        };
      }

      // If no specific keywords are detected, use the default AI response
      if (!aiResponse) {
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
              { role: 'user', content: currentInput }
            ],
            temperature: 0.7,
            max_tokens: 150
          })
        });

        const data = await response.json();
        if (data.choices && data.choices[0]) {
          aiResponse = {
            text: data.choices[0].message.content,
            isUser: false,
            timestamp: new Date(),
          };
        }
      }

      // Add the response to messages
      if (aiResponse) {
        setMessages((prev) => [...prev, aiResponse]);
      }
    } catch (error) {
      console.error('Error:', error);
      // Add error message to chat
      const errorMessage: Message = {
        text: "I apologize, but I'm having trouble processing your request. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      // Hide typing indicator after response
      setIsTyping(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1,
            y: [-2, -8, -2]
          }}
          transition={{ 
            opacity: { duration: 0.3 },
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{
            position: 'fixed',
            bottom: 80,
            right: 20,
            background: '#1d1d1f',
            padding: '12px 20px',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#ffffff',
              fontWeight: 400,
              fontSize: '14px',
              letterSpacing: '-0.01em'
            }}
          >
            Ask me anything about credit cards
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
          bgcolor: '#1d1d1f',
          color: '#ffffff',
          '&:hover': {
            bgcolor: '#2d2d2f'
          },
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)'
        }}
      >
        <ChatIcon />
      </Fab>

      <Box
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 16,
          width: '320px',
          height: '480px',
          bgcolor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            p: 2.5,
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            bgcolor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '16px', 
              fontWeight: 600,
              color: '#1d1d1f',
              letterSpacing: '-0.02em'
            }}
          >
            AI Assistant
          </Typography>
          <IconButton 
            size="small" 
            onClick={() => setIsOpen(false)} 
            sx={{ 
              color: '#1d1d1f',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.05)'
              }
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            p: 2.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            bgcolor: '#ffffff'
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                p: 2,
                bgcolor: message.isUser ? '#1d1d1f' : 'rgba(0, 0, 0, 0.03)',
                color: message.isUser ? '#ffffff' : '#1d1d1f',
                borderRadius: '12px',
                borderBottomRightRadius: message.isUser ? '4px' : '12px',
                borderBottomLeftRadius: message.isUser ? '12px' : '4px',
                boxShadow: 'none'
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  whiteSpace: 'pre-line',
                  fontSize: '14px',
                  lineHeight: 1.5,
                  letterSpacing: '-0.01em'
                }}
              >
                {message.text}
              </Typography>
              {message.link && (
                <Box sx={{ mt: 1.5 }}>
                  <Link
                    component="button"
                    onClick={() => handleLinkClick(message.link!.path)}
                    sx={{
                      color: message.isUser ? '#ffffff' : '#1d1d1f',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      fontSize: '13px',
                      fontWeight: 500,
                      bgcolor: message.isUser ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      px: 1.5,
                      py: 0.75,
                      borderRadius: '8px',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: message.isUser ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Box
                sx={{
                  alignSelf: 'flex-start',
                  maxWidth: '85%',
                  p: 2,
                  bgcolor: 'rgba(0, 0, 0, 0.03)',
                  borderRadius: '12px',
                  borderBottomLeftRadius: '4px',
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                  margin: '8px 0'
                }}
              >
                <motion.span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    background: '#1d1d1f',
                    borderRadius: '50%'
                  }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    background: '#1d1d1f',
                    borderRadius: '50%'
                  }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2
                  }}
                />
                <motion.span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    background: '#1d1d1f',
                    borderRadius: '50%'
                  }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4
                  }}
                />
              </Box>
            </motion.div>
          )}
        </Box>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              p: 2,
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              display: 'flex',
              gap: 1,
              bgcolor: '#ffffff'
            }}
          >
            <TextField
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  bgcolor: 'rgba(0, 0, 0, 0.03)',
                  '& fieldset': {
                    borderColor: 'transparent'
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.1)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1d1d1f',
                    borderWidth: '1px'
                  }
                }
              }}
            />
            <IconButton 
              type="submit" 
              sx={{ 
                bgcolor: '#1d1d1f',
                color: '#ffffff',
                '&:hover': {
                  bgcolor: '#2d2d2f'
                },
                borderRadius: '10px',
                width: '40px',
                height: '40px'
              }}
            >
              <SendIcon sx={{ fontSize: 20 }} />
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
                          ? '#1d1d1f'
                          : 'rgba(0, 0, 0, 0.03)',
                        color: message.isUser ? '#ffffff' : '#1d1d1f',
                      }}
                    >
                      <Typography variant="body1">{message.text}</Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          mt: 0.5,
                          color: message.isUser ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)',
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
                              color: message.isUser ? '#ffffff' : '#1d1d1f',
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              fontSize: '13px',
                              fontWeight: 500,
                              bgcolor: message.isUser ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                              px: 1.5,
                              py: 0.75,
                              borderRadius: '8px',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: message.isUser ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
                              }
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

          <Box sx={{ p: 2, display: 'flex', gap: 1, background: 'rgba(0, 0, 0, 0.03)' }}>
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
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1d1d1f',
                  },
                },
              }}
            />
            <IconButton
              onClick={(e) => handleSubmit(e)}
              sx={{
                background: '#1d1d1f',
                color: '#ffffff',
                '&:hover': {
                  background: '#2d2d2f',
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