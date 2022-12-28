const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    answerType: {
        type: String
    },
    text: {
        type: String
    }
});

module.exports = mongoose.model('Questions', QuestionSchema);