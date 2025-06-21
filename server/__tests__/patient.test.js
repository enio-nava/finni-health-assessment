const request = require('supertest');
const mongoose = require('mongoose');
const Patient = require('../models/patient.model');
const app = require('../server');

// Mock the Patient model
jest.mock('../models/patient.model');

describe('Patient API', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterAll(async () => {
    // Close the server after all tests
    await mongoose.connection.close();
  });

  describe('GET /api/patients', () => {
    it('should return all patients', async () => {
      // Mock data
      const mockPatients = [
        {
          _id: '1',
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1990-01-01',
          status: 'Active',
          address: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345'
          }
        },
        {
          _id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          dateOfBirth: '1985-05-15',
          status: 'Inactive',
          address: {
            street: '456 Oak Ave',
            city: 'Somewhere',
            state: 'NY',
            zipCode: '67890'
          }
        }
      ];

      // Setup the mock
      Patient.find = jest.fn().mockResolvedValue(mockPatients);

      // Make the request
      const response = await request(app).get('/api/patients');

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(Patient.find).toHaveBeenCalledTimes(1);
      expect(response.body[0].firstName).toBe('John');
      expect(response.body[1].firstName).toBe('Jane');
    });

    it('should handle errors when fetching patients', async () => {
      // Setup the mock to throw an error
      Patient.find = jest.fn().mockRejectedValue(new Error('Database error'));

      // Make the request
      const response = await request(app).get('/api/patients');

      // Assertions
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /api/patients/:id', () => {
    it('should return a patient by ID', async () => {
      // Mock data
      const mockPatient = {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        status: 'Active',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345'
        }
      };

      // Setup the mock
      Patient.findById = jest.fn().mockResolvedValue(mockPatient);

      // Make the request
      const response = await request(app).get('/api/patients/1');

      // Assertions
      expect(response.status).toBe(200);
      expect(Patient.findById).toHaveBeenCalledWith('1');
      expect(response.body.firstName).toBe('John');
    });

    it('should return 404 if patient not found', async () => {
      // Setup the mock to return null
      Patient.findById = jest.fn().mockResolvedValue(null);

      // Make the request
      const response = await request(app).get('/api/patients/999');

      // Assertions
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/patients', () => {
    it('should create a new patient', async () => {
      // Mock data
      const newPatient = {
        firstName: 'Alice',
        lastName: 'Johnson',
        dateOfBirth: '1995-10-20',
        status: 'Active',
        address: {
          street: '789 Pine St',
          city: 'Elsewhere',
          state: 'TX',
          zipCode: '54321'
        }
      };

      const savedPatient = {
        _id: '3',
        ...newPatient
      };

      // Setup the mock
      const mockSave = jest.fn().mockResolvedValue(savedPatient);
      Patient.mockImplementation(() => ({
        save: mockSave
      }));

      // Make the request
      const response = await request(app)
        .post('/api/patients')
        .send(newPatient);

      // Assertions
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id', '3');
      expect(response.body.firstName).toBe('Alice');
    });

    it('should handle validation errors', async () => {
      // Mock data - missing required fields
      const invalidPatient = {
        firstName: 'Invalid'
        // Missing lastName and other required fields
      };

      // Setup the mock to throw a validation error
      const mockSave = jest.fn().mockRejectedValue({
        name: 'ValidationError',
        message: 'Patient validation failed'
      });
      
      Patient.mockImplementation(() => ({
        save: mockSave
      }));

      // Make the request
      const response = await request(app)
        .post('/api/patients')
        .send(invalidPatient);

      // Assertions
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PUT /api/patients/:id', () => {
    it('should update a patient', async () => {
      // Mock data
      const updatedPatient = {
        firstName: 'John',
        lastName: 'Updated',
        dateOfBirth: '1990-01-01',
        status: 'Inactive'
      };

      const returnedPatient = {
        _id: '1',
        ...updatedPatient,
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345'
        }
      };

      // Setup the mock
      Patient.findByIdAndUpdate = jest.fn().mockResolvedValue(returnedPatient);

      // Make the request
      const response = await request(app)
        .put('/api/patients/1')
        .send(updatedPatient);

      // Assertions
      expect(response.status).toBe(200);
      expect(Patient.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        updatedPatient,
        { new: true }
      );
      expect(response.body.lastName).toBe('Updated');
    });

    it('should return 404 if patient to update is not found', async () => {
      // Setup the mock to return null
      Patient.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      // Make the request
      const response = await request(app)
        .put('/api/patients/999')
        .send({ firstName: 'NotFound' });

      // Assertions
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/patients/:id', () => {
    it('should delete a patient', async () => {
      // Mock data
      const deletedPatient = {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe'
      };

      // Setup the mock
      Patient.findByIdAndDelete = jest.fn().mockResolvedValue(deletedPatient);

      // Make the request
      const response = await request(app).delete('/api/patients/1');

      // Assertions
      expect(response.status).toBe(200);
      expect(Patient.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(response.body).toHaveProperty('message');
    });

    it('should return 404 if patient to delete is not found', async () => {
      // Setup the mock to return null
      Patient.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      // Make the request
      const response = await request(app).delete('/api/patients/999');

      // Assertions
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });
});
