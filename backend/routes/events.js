var express = require("express");
var router = express.Router();

const Event = require("../models/events");
const Admin = require("../models/admins");
const Group = require("../models/groups");
const Participant = require("../models/participants");
const Etablissement = require("../models/etablissements");

const { checkBody } = require("../modules/checkBody");

// Fonction pour vérifier et récupérer l'admin via son token et éviter les répétitions
const verifyAdminToken = (token) => {
  return Admin.findOne({ token }).then((admin) => {
    if (!admin) {
      throw new Error("Aucun admin trouvé avec ce token");
    }
    return admin; // On retourne l'objet admin
  });
};

// Route pour la création d'un nouvel event
router.post("/add", (req, res) => {
  const fields = [
    "title",
    "adminId",
    "authorisations",
    "groupId",
    "participantID",
    "dateStart",
    "dateEnd",
    "place",
    "supportsCom",
  ];

  // Vérification de la présence des données
  if (!checkBody(req.body, fields)) {
    return res.status(400).json({ result: false, message: "Champs manquants ou vides" });
  }

  const newEvent = new Event({
    title: req.body.title,
    adminId: req.body.adminId,
    authorisations: req.body.authorisation,
    groupId: req.body.groupId,
    participantId: req.body.participantId,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    place: req.body.place,
    supportsCom: req.body.supportsCom,
  });

  newEvent
    .save()
    .then(() => {
      res.status(200).json({ response: true, message: "Évènement créé" });
    })
    .catch((error) => {
      res.status(500).json({ result: false, message: "Erreur lors de la création", error });
    });
});

// Route pour récupérer les events d'un établissement
router.get("/eventsByEtablissement/:ObjectId", (req, res) => {
  Event.find({ etablissementId: req.params.ObjectId })
    .then((events) => {
      if (!events || events.length === 0) {
        return res.status(404).json({ result: false, message: "Aucun événement trouvé pour cet établissement" });
      }
      res.status(200).json({ result: true, data: events });
    })
    .catch((error) => {
      res.status(500).json({ result: false, message: "Erreur serveur", error });
    });
});

// Route pour modifier un évènement
router.put("/update/:id", (req, res) => {
  const fields = [
    "title",
    "adminId",
    "authorisations",
    "groupId",
    "participantID",
    "dateStart",
    "dateEnd",
    "place",
    "supportsCom",
  ];

  // Vérification des champs
  if (!checkBody(req.body, fields)) {
    return res.status(400).json({ result: false, message: "Champs manquants ou vides" });
  }

  Event.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      adminId: req.body.adminId,
      authorisations: req.body.authorisation,
      groupId: req.body.groupId,
      participantId: req.body.participantId,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      place: req.body.place,
      supportsCom: req.body.supportsCom,
    },
    { new: true }
  )
    .then((updateEvent) => {
      if (!updateEvent) {
        return res.status(404).json({ result: false, message: "Évènement non trouvé" });
      }
      res.status(200).json({ result: true, message: "Évènement mis à jour", event: updateEvent });
    })
    .catch((error) => {
      res.status(500).json({ result: false, message: "Erreur serveur", error });
    });
});

// Route pour supprimer un évènement
router.delete("/delete/:id", (req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then((deletedEvent) => {
      if (!deletedEvent) {
        return res.status(404).json({ result: false, message: "Évènement non trouvé" });
      }
      res.status(200).json({ result: true, message: "Évènement supprimé avec succès" });
    })
    .catch((error) => {
      res.status(500).json({ result: false, message: "Erreur serveur", error });
    });
});

// Route pour récupérer les événements créés par un admin via son token
router.get("/eventsByAdmin/:token", (req, res) => {
  verifyAdminToken(req.params.token)
    .then((admin) => {
      return Event.find({ adminId: admin._id });
    })
    .then((events) => {
      if (!events || events.length === 0) {
        return res.status(404).json({ result: false, message: "Aucun événement trouvé pour cet admin" });
      }
      res.status(200).json({ result: true, data: events });
    })
    .catch((error) => {
      res.status(400).json({ result: false, message: error.message });
    });
});

router.get("/groupsByEtablissement/:ObjectId", (req, res) => {
  Group.find({ etablissementId: req.params.ObjectId })
    .then((groups) => {
      if (!groups || groups.length === 0) {
        return res.status(404).json({ result: false, message: "Aucun groupe trouvé pour cet établissement" });
      }
      // Remappez les champs pour s'assurer d'avoir un "id"
      const formattedGroups = groups.map(group => ({
        id: group._id, // Propriété attendue par `DataGrid`
        name: group.name, // Nommez vos colonnes correctement dans le frontend
        otherField: group.otherField,
      }));

      res.status(200).json({ result: true, data: formattedGroups }); // Envoyer le format compatible frontend
    })
    .catch((error) => {
      res.status(500).json({ result: false, message: "Erreur serveur", error });
    });
});

// Route pour récupérer les participants d'un établissement
router.get("/participantsByEtablissement/:ObjectId", (req, res) => {
  Participant.find({ etablissementId: req.params.ObjectId })
    .then((participants) => {
      if (!participants || participants.length === 0) {
        return res.status(404).json({ result: false, message: "Aucun participant trouvé pour cet établissement" });
      }
      res.status(200).json({ result: true, data: participants });
    })
    .catch((error) => {
      res.status(500).json({ result: false, message: "Erreur serveur", error });
    });
});

// Route pour récupérer les autorisations d'un événement via le token admin
router.get("/autorisationsByEventViaAdminToken/:token", (req, res) => {
  verifyAdminToken(req.params.token)
    .then((admin) => {
      return Event.find({ adminId: admin._id }).populate("authorisations");
    })
    .then((events) => {
      if (!events || events.length === 0) {
        return res.status(404).json({ result: false, message: "Aucun événement trouvé pour cet admin" });
      }
      res.status(200).json({ result: true, data: events });
    })
    .catch((error) => {
      res.status(400).json({ result: false, message: error.message });
    });
});

module.exports = router;