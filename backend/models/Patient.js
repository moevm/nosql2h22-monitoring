const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    profile: {
        type: Schema.Types.ObjectId
    },
});

module.exports = mongoose.model('Patients', PatientSchema);