import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Paper, Grid, TextField, 
  Button, MenuItem, Alert, CircularProgress, Snackbar 
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, Controller } from 'react-hook-form';
import api from '../services/api';

const statusOptions = ['Inquiry', 'Onboarding', 'Active', 'Churned'];

const PatientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: null,
      status: 'Inquiry',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      }
    }
  });

  // Fetch patient data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchPatient = async () => {
        try {
          setLoading(true);
          const data = await api.getPatientById(id);
          
          // Format date for the form
          const formattedData = {
            ...data,
            dateOfBirth: new Date(data.dateOfBirth)
          };
          
          reset(formattedData);
          setError(null);
        } catch (err) {
          setError('Failed to load patient data. Please try again.');
          console.error('Error fetching patient:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchPatient();
    }
  }, [id, isEditMode, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await api.updatePatient(id, data);
        setSnackbar({
          open: true,
          message: 'Patient updated successfully',
          severity: 'success'
        });
      } else {
        await api.createPatient(data);
        setSnackbar({
          open: true,
          message: 'Patient created successfully',
          severity: 'success'
        });
        reset();
      }
      
      // Navigate back to dashboard after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: `Failed to ${isEditMode ? 'update' : 'create'} patient`,
        severity: 'error'
      });
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} patient:`, err);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEditMode ? 'Edit Patient' : 'Add New Patient'}
        </Typography>

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
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              {/* Personal Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: 'First name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      fullWidth
                      required
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Controller
                  name="middleName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Middle Name (Optional)"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: 'Last name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      fullWidth
                      required
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  rules={{ required: 'Date of birth is required' }}
                  render={({ field }) => (
                    <DatePicker
                      label="Date of Birth"
                      value={field.value}
                      onChange={field.onChange}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                          error: !!errors.dateOfBirth,
                          helperText: errors.dateOfBirth?.message
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: 'Status is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Status"
                      fullWidth
                      required
                      error={!!errors.status}
                      helperText={errors.status?.message}
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              
              {/* Address Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Address Information
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Controller
                  name="address.street"
                  control={control}
                  rules={{ required: 'Street address is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Street Address"
                      fullWidth
                      required
                      error={!!errors.address?.street}
                      helperText={errors.address?.street?.message}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Controller
                  name="address.city"
                  control={control}
                  rules={{ required: 'City is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="City"
                      fullWidth
                      required
                      error={!!errors.address?.city}
                      helperText={errors.address?.city?.message}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Controller
                  name="address.state"
                  control={control}
                  rules={{ required: 'State is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="State"
                      fullWidth
                      required
                      error={!!errors.address?.state}
                      helperText={errors.address?.state?.message}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Controller
                  name="address.zipCode"
                  control={control}
                  rules={{ 
                    required: 'ZIP code is required',
                    pattern: {
                      value: /^\d{5}(-\d{4})?$/,
                      message: 'Invalid ZIP code format'
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="ZIP Code"
                      fullWidth
                      required
                      error={!!errors.address?.zipCode}
                      helperText={errors.address?.zipCode?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {isEditMode ? 'Update Patient' : 'Add Patient'}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
      
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

export default PatientForm;
