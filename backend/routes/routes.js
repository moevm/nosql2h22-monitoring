const express = require('express');
const multer = require('multer');
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

router.get('/Patient/recommendation', (req, res, next) => {
    const body = req.query.patientId;
    console.log(body)
    res.send([{
        id: "new",
        date: new Date(),
        text: 'Рекомендация'
    }]);
});

router.get('/Patient/unsignedMedia', (req, res, next) => {
    const patientId = req.query.patientId;
    res.send(['https://thumbs.dreamstime.com/b/panoramic-autumn-landscape-wooden-path-fall-nature-backgro-sunset-background-97979511.jpg']);
});

router.post('/Patient/answer', upload.any(), (req, res, next) => {
    const data = req.body;
   /* Тут находятся данные
   * в данной ручки следующий объект:
   * quizResult: QuizResult
   * */

    const files = req.files;
    /* Тут находятся массив всех загруженных файлов
   * Каждый элемент массива содержит следующее:
   * {
   * filename: string // Навряд ли понадобиться
   * originaname: string // оригинальное полное название файла
   * encoding: string // Навряд ли понадобиться
   * mimetype: string // Навряд ли понадобиться
   * destination: string // путь, куда сохранился файл(сейчас стоит ./assets/. Если надо, то выше можно поменять путь
   * filename: string // имя этого файла в папке destination
   * path: string // полный путь файла относительно текущей деректории
   * size: number // размер файла
   * }
   * */
    console.log(req.body, req.files);
    res.send(['https://thumbs.dreamstime.com/b/panoramic-autumn-landscape-wooden-path-fall-nature-backgro-sunset-background-97979511.jpg']);
})

module.exports = router;