const mongoose = require('mongoose')

const participantSchema = mongoose.Schema ({
    firstName:String,
    lastName: String,
    email: String,
    phone: String,
    pictureUrl: String,
    birthDate: Date
});

const Participant = mongoose.model('participants', participantSchema);

module.exports = Participant