const express = require('express');
const patientController = require('../controllers/patient.controller');

const router = express.Router();

// GET all patients
router.get('/', patientController.getAllPatients);

// GET a single patient by ID
router.get('/:id', patientController.getPatientById);

// POST create a new patient
router.post('/', patientController.createPatient);

// PUT update a patient
router.put('/:id', patientController.updatePatient);

// DELETE a patient
router.delete('/:id', patientController.deletePatient);

module.exports = router;
