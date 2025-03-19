import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ background: 'white' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 700, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Card Clarity
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="primary" onClick={() => navigate('/compare')}>
            Compare Cards
          </Button>
          <Button color="primary" onClick={() => navigate('/quiz')}>
            Take Quiz
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/auth')}
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
              }
            }}
          >
            Login / Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 