var express = require("express");
var router = express.Router();
const Etablissement = require("../models/etablissements");
const { checkBody } = require("../modules/checkBody");

// Route pour la création d'un nouvel établissement
router.post("/add", function (req, res) {
  const fields = ["name", "groupIds"];

  // Vérification de la présence des données
  if (!checkBody(req.body, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    const newEtablissement = new Etablissement({
      name: req.body.name,
      groupIds: req.body.groupIds,
    });

    newEtablissement.save().then((response) => {
      res.json({ result: true, message: "Etablissement créé" });
    });
  }
});

module.exports = router;
