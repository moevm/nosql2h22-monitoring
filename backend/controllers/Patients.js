const Patients = require('../models/Patient');
const QuizResultMedia = require('../models/QuizResultMedia');
const QuizResult = require('../models/QuizResult');
const PatientMedia = require('../models/PatientMedia');
const Recommendation = require('../models/Recommendation');
const Question = require('../models/Question');

module.exports.up = async function (req, res) {
    const files = req.files;
    res.send(files);
};

/**
 * METHOD: GET
 * URL: /Patient?:id
 */
module.exports.GetPatient = async function (req, res) {
    const patientId = req.query.id;
    const patient = await Patients.findById(patientId).populate('quiz').populate('recommendations').populate('quiz_results').exec();
    if (!patient) {
        res.sendStatus(404);
        return;
    }
    res.send(patient);
};

/**
 * METHOD: GET
 * URL: /Patient/quiz?:patientId
 */
module.exports.GetPatientQuiz = async function (req, res) {
    const patientId = req.query.patientId;
    const patient = await Patients.findById(patientId).populate('quiz').exec();
    if (!patient) { res.sendStatus(404); return; }

    res.send( patient.quiz);
};

/**
 * METHOD: POST
 * URL: /Patient/quiz
 */
module.exports.CreateQuiz = async function (req, res) {
    const body = req.body;
    let patient = await Patients.findById(body.patientId).exec();
    if (!patient) {
        res.sendStatus(404);
        return;
    }
    const quiz = body.quiz;
    let q_Ids = [];
    for (const question of quiz) { // fuck forEach (maybe)
        let newQuestion = new Question({
            text: question.text,
            answerType: question.answersType
        });
        await newQuestion.save();
        q_Ids.push(newQuestion._id);
    }
    patient.quiz = [...patient.quiz, ...q_Ids];
    await patient.save();
    res.send(patient);
};

/**
 * METHOD: GET
 * URL: /Patient/answers/media?:QuizResultId
 */
module.exports.GetAnswersMedia = async function (req, res) {
    console.log(1);
    const QuizResultId = req.query.QuizResultId;
    const QuizMedia = await QuizResultMedia.findOne({quizResult: QuizResultId}).exec();
    console.log(QuizMedia);


    if (!QuizMedia) { res.sendStatus(404); }
    res.send(QuizMedia.src);
};

/**
 * METHOD: POST
 * URL: /Patient/answer
 */
module.exports.CreateAnswer = async function (req, res) {
    const body = req.body;
    const files = req.files;
    const quizResult = body.quizResult;
    const patientId = body.patientId;

    console.log(typeof quizResult)
    const newQR = new QuizResult({
        Result: JSON.parse(quizResult)
    });
    await newQR.save();
    const src = files.map(f => f.path);
    const newQRMedia = new QuizResultMedia({
        src: src,
        create_at: newQR.date,
        quizResult: newQR._id
    });

    await newQRMedia.save();

    const patient = await Patients.findById(JSON.parse(patientId)).exec();

    patient.quiz_results.push(newQR._id);
    await patient.save();

    res.send({ newQR, newQRMedia });
};

/**
 * METHOD: GET
 * URL: /Patient/unsignedMedia?:patientId
 */
module.exports.GetUnsignedMedia = async function (req, res) {
    const patientId = req.query.patientId;
    const pMedia = await PatientMedia.findOne({ patient: patientId, type: 'Unsigned' }).exec();
    if (!pMedia) { res.sendStatus(404); return; }
    res.send(pMedia.src);
};

/**
 * METHOD: POST
 * URL: /Patient/unsignedMedia/
 */

module.exports.CreateUnsignedMedia = async function (req, res) {
    const body = req.body;
    const files = req.files;
    const patientId = body.patient.replaceAll('"', '');
    const src = files.map(f => f.path);
    let pMedia = new PatientMedia({
        src: src,
        type: 'Unsigned',
        patient: patientId
    });
    await pMedia.save();
    res.send(pMedia);
};

/**
 * METHOD: GET
 * URL: /Patient/signedMedia?:patientId
 */
module.exports.GetSignedMedia = async function (req, res) {
    const patientId = req.query.patientId;
    const pMedia = await PatientMedia.findOne({ patient: patientId, type: 'Signed' }).exec();
    if (!pMedia) { res.sendStatus(404); return; }
    res.send(pMedia.src);
};

/**
 * METHOD: POST
 * URL: /Patient/signedMedia/
 */
module.exports.CreateSignedMedia = async function (req, res) {
    const body = req.body;
    const files = req.files;
    const patientId = body.patientId.replaceAll('"', '');
    const src = files.map(f => f.path);
    let pMedia = new PatientMedia({
        src: src,
        type: 'Signed',
        patient: patientId
    });
    await pMedia.save();
    res.send(pMedia);
};

/**
 * METHOD: GET
 * URL: /Patient/Recommendation?:patientId
 */
module.exports.GetRecommendations = async function (req, res) {
    try {
        const patientId = req.query.patientId;
        Patients.exists({ _id: patientId }, async (err, doc) => {
            if (err) {
                throw err;
            }
            if (!doc) {
                res.sendStatus(404);
                return;
            }
            const patient = await Patients.findById(patientId).populate('recommendations').exec();
            res.send({ values: patient.recommendations });
        });
    } catch (e) {
        console.error(e);
    }
};

/**
 * METHOD: POST
 * URL: /Patient/recommendation
 */
module.exports.CreateRecommendation = async function (req, res) {
    const body = req.body;
    const patientId = body.patientId;
    const text = body.text;
    let newRec = await new Recommendation({
        text: text,
        date: new Date()
    });
    await newRec.save();
    let patient = await Patients.findById(patientId).exec();
    patient.recommendations.push(newRec._id);
    await patient.save();
    res.send(newRec);
};

/**
 * METHOD: PATCH
 * URL: /Patient/setDoctor
 */
module.exports.SetDoctor = async function (req, res) {
    const body = req.body;
    const patientId = body.patientId;
    const doctorId = body.doctorId;
    let Patient = await Patients.findById(patientId).exec();
    Patient.doctor = doctorId;
    await Patient.save();
    res.send(Patient);
};