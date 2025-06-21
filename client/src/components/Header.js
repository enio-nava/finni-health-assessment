import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <MedicalServicesIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Finni Health - Patient Management
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
            sx={{ mr: 2 }}
          >
            Dashboard
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/add-patient"
            variant="outlined"
            sx={{ color: 'white', borderColor: 'white' }}
          >
            Add Patient
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
