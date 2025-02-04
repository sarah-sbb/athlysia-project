const mongoose = require('mongoose')

const eventSchema = mongoose.Schema ({
    title:String,
    admin_id:String,
})

const Event = mongoose.model('events', eventSchema);

module.exports = Event