import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, fontWeight: 700 }}
            component={RouterLink}
            to="/"
          >
            CardClarity
          </Typography>
          <nav>
            <Button
              component={RouterLink}
              to="/compare"
              sx={{ my: 1, mx: 1.5 }}
            >
              Compare Cards
            </Button>
            <Button
              component={RouterLink}
              to="/points"
              sx={{ my: 1, mx: 1.5 }}
            >
              Points Optimizer
            </Button>
            <Button
              component={RouterLink}
              to="/debt"
              sx={{ my: 1, mx: 1.5 }}
            >
              Debt Management
            </Button>
          </nav>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 