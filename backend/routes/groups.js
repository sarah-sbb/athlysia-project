var express = require("express");
var router = express.Router();
const Group = require("../models/groups");
const Admin = require("../models/admins");
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

// Route pour récupérer les groupes d'un admin en particulier (à partir de l'ID via le token)

router.post("/findAllGroupsByAdminToken", (req, res) => {
  const fields = ["token"];
  let adminId = "";

    // Vérification de la présence des données
    if (!checkBody(req.body, fields)) {
      res.json({ result: false, message: "Champs manquants ou vides" });
    } else {
      Admin.findOne({ token: req.body.token }).then((data) => {
        if(!data) {
          res.json({ result: false, message: "Aucun admin trouvé avec ce token"})
        } else {
          adminId = data._id;
          Group.find({ adminId }).then((data) => {
            if (data.length === 0) {
              res.json({
                result: false,
                message: "Aucun groupe trouvé pour cet admin",
              });
            } else {
              res.json({ result: true, data });
            }
          });
        }
      })
    }
});

// Route pour rechercher tous les groups d'un établissement
router.get("/findAllByEtablissement/:etablissement", (req, res) => {
  const { etablissement } = req.params; // Extraction du paramètre depuis req.params

  // Vérification de la présence des données
  if (!etablissement) {
    return res.json({
      result: false,
      message: "L'identifiant de l'établissement est manquant.",
    });
  }
  
  // Recherche des groupes dans la base MongoDB
  Group.find({ etablissement })
    .then((data) => {
      if (data.length === 0) {
        res.json({
          result: false,
          message: "Aucun groupe trouvé pour cet établissement.",
        });
      } else {
        res.json({
          result: true,
          data, // Renvoie les groupes trouvés
        });
      }
    });
  });

module.exports = router;
