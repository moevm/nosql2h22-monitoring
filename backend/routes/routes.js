const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/Users');
const PatientsController = require('../controllers/Patients');
const upload = require('../upload');
const db = require('../db.js');

// Test

router.post('/upload', upload.any(), PatientsController.up);

// User

router.post('/GetUser/', UsersController.GetUser); // +
router.get('/GetAllUsers/', UsersController.GetAllUsers);

// Patient

router.get('/Patient', PatientsController.GetPatient); // +

// Quiz

router.get('/Patient/quiz', PatientsController.GetPatientQuiz);
router.post('/Patient/quiz', PatientsController.CreateQuiz); // ?

// Answers

router.get('/Patient/answers/media', PatientsController.GetAnswersMedia);
router.post('/Patient/answer', PatientsController.CreateAnswer); // ?

// Media

router.get('/Patient/unsignedMedia', PatientsController.GetUnsignedMedia);
router.post('/Patient/unsignedMedia', PatientsController.CreateUnsignedMedia); // ?

router.get('/Patient/signedMedia', PatientsController.GetSignedMedia);
router.post('/Patient/signedMedia', PatientsController.CreateSignedMedia); // ?

// Recommendation

router.get('/Patient/Recommendation', PatientsController.GetRecommendations); // +
router.post('/Patient/recommendation', PatientsController.CreateRecommendation); // +

// Doctor

router.patch('/Patient/setDoctor', PatientsController.SetDoctor); //+

module.exports = router;