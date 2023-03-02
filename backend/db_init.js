const db = require('./db');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const User = require('./models/User');

const newUsers = [{Name: 'Ivan Ivanov', login: 'ivan_ivanov', type: 'doctor'}, {Name: 'Petr Petrov', login: 'petr_petrov', type: 'doctor'}, {Name: 'Zidan Zidanov', login: 'z', type: 'patient'}, {Name: 'Kek W', login: 'kekl', type: 'patient'}];

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
db.close();