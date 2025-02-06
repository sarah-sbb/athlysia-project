const mongoose = require('mongoose')

const autorisationSchema = mongoose.Schema ({
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'participants' },
    isValidated: Boolean
})

const Autorisation = mongoose.model('autorisation', autorisationSchema);

module.exports = Autorisation