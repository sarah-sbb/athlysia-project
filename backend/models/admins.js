const mongoose = require('mongoose')

const adminSchema = mongoose.Schema ({
    firstname:String,
    lastname:String,
    function:String,
    role: String,
    picture_URL:String,
    email: String,
    token: String,
})

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin
