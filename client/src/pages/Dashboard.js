import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Alert, Snackbar, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

import PatientTable from '../components/PatientTable';
import api from '../services/api';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const navigate = useNavigate();

  // Fetch patients on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await api.getAllPatients();
      setPatients(data);
      setError(null);
    } catch (err) {
      setError('Failed to load patients. Please try again later.');
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatient = async (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await api.deletePatient(patientId);
        setPatients(patients.filter(patient => patient._id !== patientId));
        setSnackbar({
          open: true,
          message: 'Patient deleted successfully',
          severity: 'success'
        });
      } catch (err) {
        setSnackbar({
          open: true,
          message: 'Failed to delete patient',
          severity: 'error'
        });
        console.error('Error deleting patient:', err);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Patient Dashboard
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/add-patient')}
        >
          Add New Patient
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <PatientTable 
          patients={patients} 
          onDeletePatient={handleDeletePatient} 
        />
      )}

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;
