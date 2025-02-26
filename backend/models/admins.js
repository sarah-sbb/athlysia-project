const mongoose = require('mongoose')

const ROLES = [ "Admin", "Gestionnaire", "Viewer" ]; // la liste des rôles est définie ici

const adminSchema = mongoose.Schema ({
    firstName:String,
    lastName:String,
    position:String,
    // role: String,
    role: [{type: String, enum: ROLES}],
    pictureUrl:String,
    email: String,
    etablissement: { type: mongoose.Schema.Types.ObjectId, ref: 'etablissements' },
    token: String,
    password: String
})

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin
