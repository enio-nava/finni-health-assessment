const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  }
});

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  middleName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Inquiry', 'Onboarding', 'Active', 'Churned'],
    default: 'Inquiry'
  },
  address: addressSchema,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the 'updatedAt' field on save
patientSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
