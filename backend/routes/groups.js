var express = require("express");
var router = express.Router();
const Group = require("../models/groups");
const Admin = require("../models/admins");
const Participant = require("../models/participants");
const { checkBody } = require("../modules/checkBody");
const Etablissement = require("../models/etablissements");

// if (!mongoose.isValidObjectId(adminId) || !mongoose.isValidObjectId(etablissementId)) {
//   return res.status(400).json({
//     result: false,
//     message: "adminId ou etablissementId invalide.",
//   });
// }
// HASSEN

// Ajout d'un nouveau groupe avec etablisement et admin en params = à améliorer sur la sécurité
router.post("/add/:adminId/:etablissementId", (req, res) => {
  const fields = ["title", "participantIds"];

  console.log("CheckBody result:", req.body);
  if (!checkBody(req.body, fields)) {
    return res.json({ result: false, message: "Champs manquants ou vides" });
  }

  // Vérif si le title du group n'est pas présent
  Group.findOne({ title: req.body.title }).then((response) => {
    if (response) {
      return res.json({
        result: false,
        message: " Ce nom de groupe est déjà existant",
      });
    } else {
      //on vérifie que participantIds est bien un tableau, pour ne pas se retrouver avec des formes différentes en BDD.
      const participantIds = Array.isArray(req.body.participantIds)
        ? req.body.participantIds
        : [req.body.participantIds];

      const newGroup = new Group({
        title: req.body.title,
        adminId: req.params.adminId,
        etablissementId: req.params.etablissementId,
        participantIds: participantIds,
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
});

// Route pour rechercher tous les groups d'un établissement
router.get("/findAllGroupsByEtablissement/:etablissementId", (req, res) => {
  const etablissementId = req.params.etablissementId;
  
  Group.find({ etablissementId }).populate("adminId", "firstName lastName").then((data) => {
    if (data.length === 0) {
      res.json({
        result: false,
        message: "Aucun groupe trouvé pour cet établissement.",
      });
    } else {
      res.json({
        result: true,
        allGroups : data,
      });
    }
  });
});

router.delete("/:groupId", (req, res) => {

    Group.deleteOne({ _id : req.params.groupId }).then((data) => {
      if (data.deletedCount > 0) {
        return res.json({ result: true, message: "Groupe supprimé" });
      } else {
        return res.json({ result: false, message: "Aucun groupe trouvé avec cet ID" });
      }
    });
  
});


router.get("/findOneGroup/:groupId", (req,res) =>{

Group.findOne({_id: req.params.groupId}).populate({path: "participantIds", select: "firstName lastName"}).then((data)=> {
if (!data) {
  return res.json({result: false, message: 'Aucun groupe trouvé'
  })} else {
    return res.json({result : true, group: data, message : `Groupe :  ${data.title} trouvé`})
  }

  
})

})






// TRIER LES ROUTES CI - DESSOUS

// Route pour récupérer les groupes d'un admin en particulier (à partir de l'ID via le token)

router.post("/findAllGroupsByAdminToken", (req, res) => {
  const fields = ["token"];
  let adminId = "";

  // Vérification de la présence des données
  if (!checkBody(req.body, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    Admin.findOne({ token: req.body.token }).then((data) => {
      if (!data) {
        res.json({
          result: false,
          message: "Aucun admin trouvé avec ce token",
        });
      } else {
        adminId = data._id;
        Group.find({ adminId })
          .populate("participantIds", "pictureUrl -_id") // Populate pour récupérer seulement les pictureUrl des participants
          .then((data) => {
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
    });
  }
});

// Route pour rechercher tous les groups d'un établissement (avec populate participants)
router.get(
  "/findAllByEtablissementWithParticipantInfos/:etablissement",
  (req, res) => {
    const { etablissement } = req.params; // Extraction du paramètre depuis req.params

    // Vérification de la présence des données
    if (!etablissement) {
      return res.json({
        result: false,
        message: "L'identifiant de l'établissement est manquant.",
      });
    }

    // Recherche des groupes dans la base MongoDB
    Group.find({ etablissementId: req.params.etablissement })
      .populate("participantIds", "pictureUrl -_id")
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
  }
);

module.exports = router;
