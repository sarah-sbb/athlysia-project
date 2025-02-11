const mongoose = require("mongoose");

const SUPPORTS_COM = [ "Facebook", "Internet" ]; // penser à rajouter les supports de com ici

const autorisationSchema = mongoose.Schema({
  participant: { type: mongoose.Schema.Types.ObjectId, ref: "participants" }, 
  isValidated: Boolean
});

const eventSchema = mongoose.Schema({
  title: String,
  adminId: String,
  authorisations: [autorisationSchema],
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "groups" },
  dateStart: Date,
  dateEnd: Date,
  place: String,
  supportsCom: [{type: String, enum: SUPPORTS_COM}],
  etablissement: { type: mongoose.Schema.Types.ObjectId, ref: 'etablissements' },
});

const Event = mongoose.model("events", eventSchema);

module.exports = Event;
