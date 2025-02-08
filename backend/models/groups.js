const mongoose = require('mongoose')

const groupSchema = mongoose.Schema ({
    title:String,
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "admins" },
    participantIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "participants" }],
}, { timestamps: true })

const Group = mongoose.model('groups', groupSchema);

module.exports = Group