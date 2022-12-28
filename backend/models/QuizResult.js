const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizResultSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    Result: [{
        answer: {
            type: String
        },
        questionId: {
            type: Schema.Types.ObjectId,
            ref: 'Questions'
        }
    }]
});

module.exports = mongoose.model('QuizResults', QuizResultSchema);