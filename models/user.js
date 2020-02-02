const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        min: 3
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    online: Number,
    Score: Number,
    role: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema);