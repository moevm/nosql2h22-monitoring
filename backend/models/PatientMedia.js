const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientMediaSchema = new Schema({
    src: [{
        type: String
    }],
    create_at: {
        type: Date,
        default: Date.now
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patients'
    },
    type: {
        type: String
    }
});

module.exports = mongoose.model('PatientMedias', PatientMediaSchema);