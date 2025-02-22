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

// Route pour rechercher tous les events d'un établissement
router.get("/findAllByEtablissement", (req, res) => {
  const fields = ["etablissement"];

  // Vérification de la présence des données
  if (!checkBody(req.body, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    Event.find({ etablissement: req.body.etablissement }).then((data) => {
      if (data.length === 0) {
        res.json({
          result: false,
          message: "Aucun événement sur cet établissement ou établissement inconnu",
        });
      } else {
        res.json({ result: true, data });
      }
    });
  }
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

// Route pour supprimer un event (via son ID)
router.delete("/deleteById", (req, res) => {
  const fields = ["eventId"];

  // Vérification de la présence des données
  if (!checkBody(req.body, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    Event.deleteOne({ _id: req.body.eventId }).then((response) => {
      if (response.deletedCount > 0) {
        res.json({ result: true, message: "Evénement supprimé" });
      } else {
        res.json({ result: false, message: "Aucun évènement trouvé avec cet ID" });
      }
    });
  }
});

// Route pour récupérer les événements créés par un admin via le token de l'admin
router.post("/eventsByAdmin", (req, res) => {
  const fields = ["token"];

  // Vérification de la présence des données dans le corps de la requête (req.body)
  if (!checkBody(req.body, fields)) {
    return res.json({ result: false, message: "Champs manquants ou vides" });
  }

  // Vérifie si l'admin existe via son token
  Admin.findOne({ token: req.body.token })
    .then((admin) => {
      if (!admin) {
        return res.json({
          result: false,
          message: "Aucun admin trouvé avec ce token",
        });
      }

      // Si l'admin est trouvé, récupère les événements liés à l'admin
      return Event.find({ adminId: admin._id });
    })
    .then((events) => {
      if (!events || events.length === 0) {
        return res.status(404).json({
          result: false,
          message: "Aucun événement trouvé pour cet admin",
        });
      }

      res.status(200).json({ result: true, data: events });
    })
    .catch((error) => {
      res.status(500).json({
        result: false,
        message: "Erreur serveur",
        error: error.message,
      });
    });
});

// Route pour récupérer les événements d'un groupe
router.get("/getEventByGroup", (req, res) => {
  const fields = ["groupId"];

  // Vérification de la présence des données
  if (!checkBody(req.body, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    Event.find({ _id: req.body.groupId }).then((response) => {
      if (response.findCount > 0) {
        res.json({ result: true, message: "Evénement trouvé" });
      } else {
        res.json({ result: false, message: "Aucun événement trouvé avec cet ID" });
      }
    });
  }
});

// Route pour récupérer tous les events d'un établissement
router.get("/eventsByEtablissement/:etablissement", (req, res) => {
  const { etablissement } = req.params;

  // Vérification que l'ID de l'établissement est fourni
  if (!etablissement) {
    return res.status(400).json({ result: false, message: "L'identifiant de l'établissement est requis" });
  }

  // Recherche des participants par l'établissement
  Event.find({ etablissement })
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          result: false,
          message: "Aucun évènement trouvé pour cet établissement ou établissement inconnu",
        });
      }

      res.status(200).json({ result: true, data });
    })
    .catch((error) => {
      res.status(500).json({
        result: false,
        message: "Erreur lors de la récupération des évènements",
        error: error.message,
      });
    });
});

// Route pour récupérer tous les participants d'un établissement
router.get("/participantByEtablissement/:etablissement", (req, res) => {
  const { etablissement } = req.params;

  // Vérification que l'ID de l'établissement est fourni
  if (!etablissement) {
    return res.status(400).json({ result: false, message: "L'identifiant de l'établissement est requis" });
  }

  // Recherche des participants par l'établissement
  Participant.find({ etablissement })
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          result: false,
          message: "Aucun participant trouvé pour cet établissement ou établissement inconnu",
        });
      }

      res.status(200).json({ result: true, data });
    })
    .catch((error) => {
      res.status(500).json({
        result: false,
        message: "Erreur lors de la récupération des participants",
        error: error.message,
      });
    });
});

// Route pour récupérer les autorisations d'un événement via son ID
router.post("/autorisationByEvent", (req, res) => {
  const fields = ["eventId"]; 

 // Vérification de la présence des données dans le body
 if (!checkBody(req.body, fields)) {
  return res.status(400).json({ result: false, message: "Champs manquants ou vides" });
}

// Extraction de l'eventId du body
const { eventId } = req.body; 

  // Recherche de l'événement via son ID
  Event.findById(eventId)
    .then((event) => {
      if (!event) {
        return res.status(404).json({
          result: false,
          message: "Aucun événement trouvé avec cet ID",
        });
      }

      // Si l'événement est trouvé, renvoyer les autorisations
      res.status(200).json({
        result: true,
        data: event.authorisations, // Supposons que les autorisations sont stockées dans ce champ
      });
    })

    .catch((error) => {
      res.status(500).json({
        result: false,
        message: "Erreur serveur",
        error: error.message,
      });
    });
});

module.exports = router;