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

// GET route to retrieve a participant by ID
router.get("/:id", (req, res) => {
  Participant.findById(req.params.id)
    .then((participant) => {
      if (!participant) {
        return res.json({ result: false, message: "Participant non trouvé" });
      }
      res.json({ result: true, participant });
    })
});

// PUT route to update a participant by ID
router.put("/update/:id", (req, res) => {
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

// GET route for deleting a participant
router.get("/delete/:id", (req, res) => {
  Participant.findByIdAndDelete(req.params.id)
    .then((deletedParticipant) => {
      if (!deletedParticipant) {
        return res.json({ result: false, message: "Participant not found" });
      }
      // After deletion, redirect to the Participants list page (adjust the path as needed)
      res.redirect("/");
    })
});

module.exports = router;
