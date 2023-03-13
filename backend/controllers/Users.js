const Users = require('../models/User.js');
const Doctors = require('../models/Doctor');
const Patients = require('../models/Patient');

/**
 * METHOD: POST
 * URL: /GetUser
 */
module.exports.GetUser = async function (req, res) {
    const body = req.body;
    let user = await Users.findOne({ login: body.login }).exec();
    if (!user) {
        res.sendStatus(404);
        return;
    };
    let resObj = {};
    let found;
    if (user.role === 'doctor') {
        found = await Doctors.findById(user.profile).exec();
        resObj.patients = await Patients.find({ doctor: found._id }).select({ '_id': 1, 'name': 1 }).exec();
    } else {
        found = await Patients.findById(user.profile).exec();
        resObj.doctors = [];
        if (found.doctor) {
            // Doctors.findById(found.doctor).select({'_id': 1, 'name': 1}).exec((err, d) => {
            //     if(err) throw err;
            //     resObj.doctors.push({id: d._id, name: d.name});
            // });
            let doctor = await Doctors.findById(found.doctor).select({ 'name': 1, '_id': 1 }).exec();
            resObj.doctors = [doctor]
        } else {
            resObj.doctors = await Doctors.find({}).select({ 'name': 1, '_id': 1 }).exec();
        }
    }
    resObj.role = user.role;
    resObj.name = found.name;
    resObj.id = found._id;
    res.send(resObj);
};

module.exports.GetAllUsers = async function (req, res) {
    let users = await Users.find({}).exec();
    res.send(users);
}

module.exports.DB_INIT = async function (req, res){
    const newUsers = [{Name: 'Ivan Ivanov', login: 'ivan_ivanov', type: 'doctor'}, {Name: 'Petr Petrov', login: 'petr_petrov', type: 'doctor'}, {Name: 'Zidan Zidanov', login: 'z', type: 'patient'}, {Name: 'Kek W', login: 'kekl', type: 'patient'}];
    let users = await Users.find({}).exec();
    if(!users.length){
        res.send('DB have been already inited!');
        return;
    }
    newUsers.forEach(async (u) => {
        let newDoctorOrPatient = u.type === 'doctor' ? new Doctor({ name: u.Name }) : new Patient({ name: u.Name });
        await newDoctorOrPatient.save();
        const newUser = new User({
            login: u.login,
            role: u.type,
            profile: newDoctorOrPatient._id
        });
        await newUser.save();
    });
}