const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecommendationSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String
    }
});

module.exports = mongoose.model('Recommendations', RecommendationSchema);