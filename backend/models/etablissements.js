const mongoose = require('mongoose')

const etablissementSchema = mongoose.Schema ({
    name:String,
})

const Etablissement = mongoose.model('etablissement', etablissementSchema);

module.exports = Etablissement