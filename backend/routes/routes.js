const express = require('express');
const router = express.Router();

router.get('/IsUserExists', (req, res, next) => {
    const login = req.query.login;
    console.log(login);
    //find if exists
    res.send({ IsExists: true });
});

router.get('/UserProfiles', (req, res, next) => {
    const login = req.query.login;
    console.log(login);
    //check if user is doctor or patient
    res.send({ IsDoctor: true, IsPatient: false });
});

router.get('/Patient', (req, res, next) => {
    const patientId = req.query.patientId;
    console.log(patientId);
    //check if user is doctor or patient
    res.send(
        {
            id: "1",
            name: "Heisenberg",
            doctor: "2",
            quiz: [
                {
                    questionId: "1",
                    answersType: "numeric",
                    text: "some text"

                }
            ],
            quiz_results: [],
            recommendations: [
                {
                    id: "1",
                    date: new Date().toISOString(),
                    text: "some text"
                }
            ]
        }
    );
});

router.post('/GetUser/', (req, res, next) => {
    const login = req.body.login;
    console.log(login);
    // const profile = req.query.profile;
    let result = {}
    if (login === 'patient')
        res.send({
            role: 'patient',
            name: 'Heisenberg',
            id: '1',
        });
    if (login === 'doctor') {
        res.send({
            role: 'doctor',
            name: 'doc',
            id: '2',
        })
    }
});

module.exports = router;