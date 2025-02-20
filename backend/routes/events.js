var express = require("express");
var router = express.Router();

const Event = require("../models/events");
const Admin = require("../models/admins");
const Group = require("../models/groups");
const Participant = require("../models/participants");
const Etablissement = require("../models/etablissements");

const { checkBody } = require("../modules/checkBody");

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
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    const newEvent = new Event({
      title: req.body.title,
      adminId: req.body.adminId,
      authorisations: req.body.authorisation,
      groupId: req.body.groupId,
      participantId: req.body.participantId,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      place: req.body.place,
      supportsCom: req.body.supportsCom
    });

    newEvent.save().then((response) => {
      res.json({ response: true, message: "Evènement créé" });
    });
  }
});

// Route pour rechercher un évènément en fonction de l'admin qui est connecté

/* Route pour récupérer les événements créés par un admin
la router.get("/eventsByAdmin/:token", (req, res) => { 
permet de gérer explicitement les requêtes GET sur l'URL /eventsByAdmin/:token
où :token est un paramètre de la requête
*/ 
router.get("/eventsByAdmin/:token", (req, res) => {
  const fields = ["token"];
  let adminId = "";

  // Vérification de la présence des données
  if (!checkBody(req.params, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
  // on vérifie si l'admin correspond au bon token
    Admin.findOne({ adminId: req.params.token }).then((data) => {
      if (!data) {
        res.json({ result : false, message: "Aucun admin trouvé avec ce token" })
        } else {
        adminId = data._id;
        // adminId: adminID pour éviter tout ambiguité, on est sur que c'est l'adminId de l'admin qui est connecté
        Event.find({ adminId: adminId }).then((events) => {
          if (events.length === 0) {
            res.json({
              result: false,
              message: "Aucun événement trouvé pour cet admin",
            });
          } else {
            res.json({ result: true, data: events });
          }
        });
      }
    });
  }
});

// Route pour récupérer les groupes d'un établissement
router.get("/groupsByEtablissement/: ObjectId", (req, res) => {
  const fields = ["ObjectId"];

  // Vérification de la présence des données
  if (!checkBody(req.params, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    Group.find({ etablissementId: req.params.ObjectId }).then((response) => {
      if (response.length === 0) {
        res.json({
          result: false,
          message: "Aucun groupe trouvé pour cet établissement",
        });
      } else {
        res.json({ result: true, data: response });
      }
    });
  }
});

// Route pour récupérer les participants d'un établissement
router.get("/participantsByEtablissement/: ObjectId", (req, res) => {
  const fields = ["ObjectId"];

  // Vérification de la présence des données
  if (!checkBody(req.params, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    Participant.find({ etablissementId: req.params.ObjectId }).then((response) => {
      if (response.length === 0) {
        res.json({
          result: false,
          message: "Aucun groupe trouvé pour cet établissement",
        });
      } else {
        res.json({ result: true, data: response });
      }
    });
  }
});

module.exports = router;
