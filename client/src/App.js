import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Dashboard from './pages/Dashboard';
import PatientForm from './pages/PatientForm';
import PatientDetail from './pages/PatientDetail';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-patient" element={<PatientForm />} />
            <Route path="/edit-patient/:id" element={<PatientForm />} />
            <Route path="/patient/:id" element={<PatientDetail />} />
          </Routes>
          <Footer />
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
