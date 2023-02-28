const Patients = require('../models/Patient');
const QuizResultMedia = require('../models/QuizResultMedia');
const PatientMedia = require('../models/PatientMedia');
const Recommendation = require('../models/Recommendation');

module.exports.up = async function(req, res){
    res.send(req.file);
};

/**
 * METHOD: GET
 * URL: /Patient?:id
 */
module.exports.GetPatient = async function(req, res){
    const patientId = req.query.id;
    const patient = await Patients.findById(patientId).exec();
    if(!patient) {
        res.sendStatus(404);
        return;
    }
    res.send(patient);
};

/**
 * METHOD: GET
 * URL: /Patient/quiz?:patientId
 */
module.exports.GetPatientQuiz = async function(req, res){
    const patientId = req.query.patientId;
    const patient = await Patients.findById(patientId).exec();
    if(!patient) {res.sendStatus(404); return;}
    res.send({values: patient.quiz});
};

/**
 * METHOD: POST
 * URL: /Patient/quiz
 */
module.exports.CreateQuiz = async function(req, res){
    const body = req.body;
    let patient = await Patients.findById(body.patientId).exec();
    if(!patient) {
        res.sendStatus(404); 
        return;
    }
    
    patient.quiz = body.quiz;
    await patient.save();
};

/**
 * METHOD: GET
 * URL: /Patient/answers/media?:QuizResultId
 */
module.exports.GetAnswersMedia = async function(req, res){
    const QuizResultId = req.query.QuizResultId;
    const QuizMedia = await QuizResultMedia.findById({quizResult: QuizResultId}).exec();
    if(!QuizMedia) {res.sendStatus(404); return;}
    res.send(QuizMedia.src);
};

/**
 * METHOD: POST
 * URL: /Patient/answer
 */
module.exports.CreateAnswer = async function(req, res){
    const body = req.body;
    const newQR = new QuizResult({
        date: body.quizResult.date,
        Result: quizResult.Result
    });
    await newQR.save();
    const src = req.file.path;
    const newQRMedia = new QuizResultMedia({
        src: src,
        create_at: newQR.date,
        quizResult: newQR._id
    });
    await newQRMedia.save();
    res.send({newQR, newQRMedia});
};

/**
 * METHOD: GET
 * URL: /Patient/unsignedMedia?:patientId
 */
module.exports.GetUnsignedMedia = async function(req, res){
    const patientId = req.query.patientId;
    const pMedia = await PatientMedia.findOne({patient: patientId}).exec();
    if(!patient) {res.sendStatus(404); return;}
    res.send(pMedia.src);
};

/**
 * METHOD: POST
 * URL: /Patient/unsignedMedia/
 */
module.exports.CreateUnsignedMedia = async function(req, res){
    const body = req.body;
    const patientId = body.patient;
    const media = body.media;
    let pMedia = await PatientMedia.findOne({patient: patientId}).exec();
    if(!pMedia) {res.sendStatus(404); return;}
    const path = req.file.path; // save media
    pMedia.src = path;
    pMedia.created_at = new Date();
    pMedia.type = 'Unsigned';
    await pMedia.save();
};

/**
 * METHOD: GET
 * URL: /Patient/signedMedia?:patientId
 */
module.exports.GetSignedMedia = async function(req, res){
    const patientId = req.query.patientId;
    const pMedia = await PatientMedia.findOne({patient: patientId}).exec();
    if(!patient) {res.sendStatus(404); return;}
    res.send(pMedia.src);
};

/**
 * METHOD: POST
 * URL: /Patient/signedMedia/
 */
module.exports.CreateSignedMedia = async function(req, res){
    const body = req.body;
    const patientId = body.patient;
    const media = body.media;
    let pMedia = await PatientMedia.findOne({patient: patientId}).exec();
    if(!pMedia) {res.sendStatus(404); return;}
    const path = req.file.path; // save media
    pMedia.src = path;
    pMedia.created_at = new Date();
    pMedia.type = 'Signed';
    await pMedia.save();
};

/**
 * METHOD: GET
 * URL: /Patient/Recommendation?:patientId
 */
module.exports.GetRecommendations = async function(req, res){
    try{
        const patientId = req.query.patientId;
        Patients.exists({_id: patientId}, async (err, doc) => {
        if(err){
            throw err;
        }
        if(!doc){
            res.sendStatus(404); 
            return;
        }
        const patient = await Patients.findById(patientId).populate('recommendations').exec();
        res.send({values: patient.recommendations});
    });
    } catch(e){
        console.error(e);
    }
};

/**
 * METHOD: POST
 * URL: /Patient/recommendation
 */
module.exports.CreateRecommendation = async function(req, res){
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
module.exports.SetDoctor = async function(req, res){
    const body = req.body;
    const patientId = body.patientId;
    const doctorId = body.doctorId;
    let Patient = await Patients.findById(patientId).exec();
    Patient.doctor = doctorId;
    await Patient.save();
    res.send(Patient);
};