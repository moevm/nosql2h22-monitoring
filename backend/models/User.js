const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String
    },
    profile: {
        type: Schema.Types.ObjectId
    },
});

module.exports = mongoose.model('Users', UserSchema);