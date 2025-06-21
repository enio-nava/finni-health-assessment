import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Chip, Typography, Box 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { format } from 'date-fns';

const PatientTable = ({ patients, onDeletePatient }) => {
  const navigate = useNavigate();

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
    <TableContainer component={Paper} elevation={3}>
      <Table sx={{ minWidth: 650 }} aria-label="patient table">
        <TableHead>
          <TableRow sx={{ backgroundColor: (theme) => theme.palette.primary.light }}>
            <TableCell><Typography variant="subtitle1" fontWeight="bold">Name</Typography></TableCell>
            <TableCell><Typography variant="subtitle1" fontWeight="bold">Date of Birth</Typography></TableCell>
            <TableCell><Typography variant="subtitle1" fontWeight="bold">Status</Typography></TableCell>
            <TableCell><Typography variant="subtitle1" fontWeight="bold">Address</Typography></TableCell>
            <TableCell align="center"><Typography variant="subtitle1" fontWeight="bold">Actions</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <TableRow key={patient._id} hover>
                <TableCell>
                  {`${patient.firstName} ${patient.middleName ? patient.middleName + ' ' : ''}${patient.lastName}`}
                </TableCell>
                <TableCell>
                  {format(new Date(patient.dateOfBirth), 'MM/dd/yyyy')}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={patient.status} 
                    color={getStatusColor(patient.status)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  {`${patient.address.street}, ${patient.address.city}, ${patient.address.state} ${patient.address.zipCode}`}
                </TableCell>
                <TableCell align="center">
                  <IconButton 
                    color="primary" 
                    onClick={() => navigate(`/patient/${patient._id}`)}
                    size="small"
                    title="View Details"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton 
                    color="secondary" 
                    onClick={() => navigate(`/edit-patient/${patient._id}`)}
                    size="small"
                    title="Edit Patient"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => onDeletePatient(patient._id)}
                    size="small"
                    title="Delete Patient"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Box py={3}>
                  <Typography variant="body1">No patients found</Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientTable;
