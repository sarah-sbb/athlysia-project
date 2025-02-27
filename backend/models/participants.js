const mongoose = require('mongoose')

const participantSchema = mongoose.Schema ({
    firstName:String,
    lastName: String,
    email: String,
    phone: String,
    pictureUrl: String,
    birthDate: Date,
    etablissementId: { type: mongoose.Schema.Types.ObjectId, ref: 'etablissement' },
});

const Participant = mongoose.model('participant', participantSchema);

module.exports = Participant