var express = require("express");
var router = express.Router();
const Participant = require("../models/participants");
const { checkBody } = require("../modules/checkBody");

// Route pour récupérer tous les participants
router.get("/", async (req, res) => {
  try {
    const participants = await Participant.find();
    res.json({ result: true, participants });
  } catch (error) {
    res.json({ result: false, message: "Erreur serveur" });
  }
});

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

// GET route pour récupérer un participant 
router.get("/:id", (req, res) => {
  Participant.findById(req.params.id)
    .then((participant) => {
      if (!participant) {
        return res.json({ result: false, message: "Participant non trouvé" });
      }
      res.json({ result: true, participant });
    })
});

// PUT route pour mettre à jour un participant
router.put("/modify/:id", (req, res) => {
  const fields = ["firstName", "lastName", "email", "phone", "birthDate"];
  if (!checkBody(req.body, fields)) {
    return res.json({ result: false, message: "Champs manquants ou vides" });
  }
  
  Participant.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      birthDate: req.body.birthDate
    },
    { new: true }
  )
    .then((updatedParticipant) => {
      if (!updatedParticipant) {
        return res.json({ result: false, message: "Participant non trouvé" });
      }
      res.json({ result: true, message: "Participant mis à jour", participant: updatedParticipant });
    })
});

// GET route pour supprimer un participant
router.get("/delete/:id", (req, res) => {
  Participant.findByIdAndDelete(req.params.id)
    .then((deletedParticipant) => {
      if (!deletedParticipant) {
        return res.json({ result: false, message: "Participant non trouvé" });
      }
      res.redirect("/");
    })
});

module.exports = router;
