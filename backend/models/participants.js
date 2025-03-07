const mongoose = require('mongoose')

const legalGuardianSchema= mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
})

const participantSchema = mongoose.Schema ({
    firstName:String,
    lastName: String,
    pictureUrl: String,
    birthDate: Date,
    etablissementId: { type: mongoose.Schema.Types.ObjectId, ref: 'etablissement' },
    legalGuardian: [legalGuardianSchema]
});

const Participant = mongoose.model('participant', participantSchema);

module.exports = Participant