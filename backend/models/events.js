const mongoose = require("mongoose");

const SUPPORTS_COM = [ "Facebook", "Internet" ]; // penser à rajouter les supports de com ici

const autorisationSchema = mongoose.Schema({
  participant: { type: mongoose.Schema.Types.ObjectId, ref: "participant" }, 
  isValidated: Boolean
});

const eventSchema = mongoose.Schema({
  title: String,
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
  authorisations: [autorisationSchema],
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "group" },
  participantId: [{ type: mongoose.Schema.Types.ObjectId, ref: "participant" }],
  dateStart: Date,
  dateEnd: Date,
  place: String,
  supportsCom: [{type: String, enum: SUPPORTS_COM}],
  etablissement: { type: mongoose.Schema.Types.ObjectId, ref: 'etablissement' },
});

const Event = mongoose.model("events", eventSchema);

module.exports = Event;
