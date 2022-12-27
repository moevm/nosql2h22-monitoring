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

                },
                {
                    questionId: "2",
                    answersType: "numeric",
                    text: "some text"

                }
            ],
            quiz_results: [
                {
                    id: "1",
                    date: new Date(),
                    result: [
                        {
                            questionId: "1",
                            answer: 12
                        },
                        {
                            questionId: "2",
                            answer: 13
                        },
                    ]
                }

            ],
            recommendations: [
                {
                    id: "1",
                    date: new Date().toISOString(),
                    text: "some text"
                },
                {
                    id: "2",
                    date: new Date().toISOString(),
                    text: "some text"
                }
            ]
        }
    );
});

router.post('/Patient/quiz', (req, res, next) => {
    const body = req.body;
    console.log(body)
    res.send({
        questionId: "new",
        answersType: body.quiz.answersType,
        text: body.quiz.text
    });
})

router.post('/Patient/recommendation', (req, res, next) => {
    const body = req.body;
    console.log(body)
    res.send({
        id: "new",
        date: new Date(),
        text: body.text
    });
})

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