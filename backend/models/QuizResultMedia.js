const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizResultMediaSchema = new Schema({
    src: {
        type: String
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    patient: {
        type: Schema.Types.ObjectId
    },
    type: {
        type: String
    }
});

module.exports = mongoose.model('QuizResultMedias', QuizResultMediaSchema);