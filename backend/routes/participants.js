var express = require("express");
var router = express.Router();
const Participant = require("../models/participants");
const { checkBody } = require("../modules/checkBody");

// Route pour la création d'un nouveau participant
router.post("/add", (req, res) => {
  const fields = ["firstName", "lastName", "email", "phone", "birthDate"];

  // Vérification de la présence des données
  if (!checkBody(req.body, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    const newParticipant = new Participant({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        birthDate: req.body.birthDate
    });

    newParticipant.save().then((response) => {
        res.json({ result: true, message: "Participant créé" });
    })
  }
});

module.exports = router;
