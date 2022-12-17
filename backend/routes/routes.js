const express = require('express');
const router = express.Router();

router.get('/IsUserExists', (req, res, next) => {
    const login = req.query.login;
    console.log(login);
    //find if exists
    res.send({IsExists: true});
});

router.get('/UserProfiles', (req, res, next) => {
    const login = req.query.login;
    console.log(login);
    //check if user is doctor or patient
    res.send({IsDoctor: true, IsPatient: false});
});

router.get('/GetUser/', (req, res, next) => {
    const login = req.query.login;
    console.log(login);
    const profile = req.query.profile;
    res.send({
        Role: 'Doctor',
        Name: 'Heisenberg'
    });
});

module.exports = router;