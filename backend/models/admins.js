const mongoose = require('mongoose')

const adminSchema = mongoose.Schema ({
    firstName:String,
    lastName:String,
    position:String,
    role: String,
    pictureUrl:String,
    email: String,
    etablissement: { type: mongoose.Schema.Types.ObjectId, ref: 'etablissement' },
    token: String,
    password: String
})

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin
