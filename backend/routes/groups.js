var express = require("express");
var router = express.Router();
const Group = require("../models/groups");
const { checkBody } = require("../modules/checkBody");

// Route pour la création d'un nouveau groupe
router.post("/add", (req, res) => {
  const fields = ["title", "adminId", "participantIds"];

  // Vérification de la présence des données
  if (!checkBody(req.body, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    const newGroup = new Group({
      title: req.body.title,
      adminId: req.body.adminId,
      participantIds: req.body.participantIds,
    });

    newGroup.save().then((response) => {
      if (!response) {
        res.json({ result: false, message: "Impossible de créer le groupe" });
      } else {
        res.json({ result: true, message: "Groupe créé" });
      }
    });
  }
});

module.exports = router;
