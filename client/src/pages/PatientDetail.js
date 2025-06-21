import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Paper, Grid, Chip, 
  Button, Alert, CircularProgress, Divider 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { format } from 'date-fns';
import api from '../services/api';

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const data = await api.getPatientById(id);
        setPatient(data);
        setError(null);
      } catch (err) {
        setError('Failed to load patient data. Please try again.');
        console.error('Error fetching patient:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Inquiry':
        return 'info';
      case 'Onboarding':
        return 'warning';
      case 'Active':
        return 'success';
      case 'Churned':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h4" component="h1">
          Patient Details
        </Typography>
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
      ) : patient ? (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5">
              {`${patient.firstName} ${patient.middleName ? patient.middleName + ' ' : ''}${patient.lastName}`}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<EditIcon />}
              onClick={() => navigate(`/edit-patient/${patient._id}`)}
            >
              Edit Patient
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Date of Birth
              </Typography>
              <Typography variant="body1">
                {format(new Date(patient.dateOfBirth), 'MMMM d, yyyy')}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Status
              </Typography>
              <Chip 
                label={patient.status} 
                color={getStatusColor(patient.status)} 
                size="small" 
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
                Address
              </Typography>
              <Typography variant="body1">
                {patient.address.street}
              </Typography>
              <Typography variant="body1">
                {`${patient.address.city}, ${patient.address.state} ${patient.address.zipCode}`}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
                Created
              </Typography>
              <Typography variant="body1">
                {format(new Date(patient.createdAt), 'MMM d, yyyy h:mm a')}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
                Last Updated
              </Typography>
              <Typography variant="body1">
                {format(new Date(patient.updatedAt), 'MMM d, yyyy h:mm a')}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Alert severity="error">Patient not found</Alert>
      )}
    </Container>
  );
};

export default PatientDetail;
