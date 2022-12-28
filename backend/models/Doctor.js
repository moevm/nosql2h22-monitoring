const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    name: {
        type: String
    },
    patients: [{
        type: Schema.Types.ObjectId,
        ref: 'Patients'
    }],
});

module.exports = mongoose.model('Doctors', DoctorSchema);