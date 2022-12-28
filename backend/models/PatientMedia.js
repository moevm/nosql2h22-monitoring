const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientMediaSchema = new Schema({
    src: {
        type: String
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Questions'
    }
});

module.exports = mongoose.model('PatientMedias', PatientMediaSchema);