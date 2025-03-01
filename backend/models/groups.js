const mongoose = require('mongoose')

const groupSchema = mongoose.Schema ({
    title:String,
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    etablissementId: { type: mongoose.Schema.Types.ObjectId, ref: 'etablissement' },
    participantIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "participant" }],
}, { timestamps: true })


const Group = mongoose.model('group', groupSchema);

module.exports = Group