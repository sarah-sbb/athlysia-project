const mongoose = require('mongoose')

const etablissementSchema = mongoose.Schema ({
    name:String,
    // groupIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'groups' }]
})

const Etablissement = mongoose.model('etablissement', etablissementSchema);

module.exports = Etablissement