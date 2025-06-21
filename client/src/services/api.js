import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = {
  // Get all patients
  getAllPatients: async () => {
    try {
      const response = await axios.get(`${API_URL}/patients`);
      return response.data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  },

  // Get patient by ID
  getPatientById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/patients/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching patient with ID ${id}:`, error);
      throw error;
    }
  },

  // Create new patient
  createPatient: async (patientData) => {
    try {
      const response = await axios.post(`${API_URL}/patients`, patientData);
      return response.data;
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
  },

  // Update patient
  updatePatient: async (id, patientData) => {
    try {
      const response = await axios.put(`${API_URL}/patients/${id}`, patientData);
      return response.data;
    } catch (error) {
      console.error(`Error updating patient with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete patient
  deletePatient: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/patients/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting patient with ID ${id}:`, error);
      throw error;
    }
  }
};

export default api;
