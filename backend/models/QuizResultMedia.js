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
    quizResult: {
        type: Schema.Types.ObjectId,
        ref: 'QuizResults'
    }
});

module.exports = mongoose.model('QuizResultMedias', QuizResultMediaSchema);