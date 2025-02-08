var express = require("express");
var router = express.Router();
const Event = require("../models/events");
const { checkBody } = require("../modules/checkBody");

// Route pour la création d'un nouvel event
router.post("/add", (req, res) => {
  const fields = [
    "title",
    "adminId",
    "authorisations",
    "groupId",
    "dateStart",
    "dateEnd",
    "place",
    "supportsCom",
  ];

  // Vérification de la présence des données
  if (!checkBody(req.body, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    const newEvent = new Event({
      title: req.body.title,
      adminId: req.body.adminId,
      authorisations: req.body.authorisation,
      groupId: req.body.groupId,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      place: req.body.place,
      supportsCom: req.body.supportsCom
    });

    newEvent.save().then((response) => {
      res.json({ response });
    });
  }
});

module.exports = router;
