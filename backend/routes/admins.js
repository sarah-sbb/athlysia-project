var express = require("express");
var router = express.Router();
const Admin = require("../models/admins");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const { checkBody } = require("../modules/checkBody");
const { checkBodyModify } = require("../modules/checkBodyModify");

// Route pour l'ajout d'un admin en BDD (signup)
router.post("/signup", (req, res) => {
  // V1
  // const fields = [
  //   "firstName",
  //   "lastName",
  //   "function",
  //   "role",
  //   "email",
  //   "password",
  //   "etablissement",
  // ];
  // if (!checkBody(req.body, fields)) {
  //   res.json({ result: false, message: "Champs vides" });
  // }
  // Vérification de la présence des données
  if (!checkBody(req.body)) {
    res.json({ result: false, message: "Champs vides" });
  } else {
    // Check si l'admin n'existe pas déjà via son email
    Admin.findOne({ email: req.body.email }).then((response) => {
      if (response) {
        res.json({ result: false, message: "Admin existe déjà en BDD" });
      } else {
        // Enregistrement de l'admin en BDD
        const newAdmin = new Admin({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          position: req.body.position,
          role: req.body.role,
          pictureUrl: req.body.pictureUrl,
          etablissement: req.body.etablissement,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          token: uid2(32),
        });

        newAdmin.save().then((response) => {
          res.json({
            result: true,
            token: response.token,
            etablissement: response.etablissement,
            role: response.role,
            infoAdmin: {
              firstName: response.firstName,
              lastName: response.lastName,
              position: response.position,
            },
          });
        });
      }
    });
  }
});

// Route pour la connexion de l'admin (signin)
router.post("/signin", (req, res) => {
  const fields = ["email", "password"];

  // Vérification de la présence des données
  if (!checkBody(req.body, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    Admin.findOne({ email: req.body.email }).then((response) => {
      if (
        response &&
        bcrypt.compareSync(req.body.password, response.password)
      ) {
        res.json({
          result: true,
          token: response.token,
          etablissement: response.etablissement,
          role: response.role,
          infoAdmin: {
            firstName: response.firstName,
            lastName: response.lastName,
            position: response.position,
          },
        });
      } else {
        res.json({
          result: false,
          message: "Aucun admin trouvé - mot de passe ou email incorrect",
        });
      }
    });
  }
});

// Route pour rechercher un admin en particulier (à partir de son token)

router.post("/findByToken", (req, res) => {
  const fields = ["token"];

  // Vérification de la présence des données
  if (!checkBody(req.body, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    Admin.findOne({ token: req.body.token }).then((response) => {
      if (!response) {
        res.json({
          result: false,
          message: "Aucun admin trouvé avec ce token",
        });
      } else {
        res.json({ result: true, data: response });
      }
    });
  }
});

// Route pour rechercher tous les admins d'un établissement
router.get("/findAllByEtablissement", (req, res) => {
  const fields = ["etablissement"];

  // Vérification de la présence des données
  if (!checkBody(req.body, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    Admin.find({ etablissement: req.body.etablissement }).then((data) => {
      if (data.length === 0) {
        res.json({
          result: false,
          message: "Aucun admin sur cet établissement ou établissement inconnu",
        });
      } else {
        res.json({ result: true, data });
      }
    });
  }
});

// Route pour supprimer un admin (via son ID)
router.delete("/deleteById", (req, res) => {
  const fields = ["adminId"];

  // Vérification de la présence des données
  if (!checkBody(req.body, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    Admin.deleteOne({ _id: req.body.adminId }).then((response) => {
      if (response.deletedCount > 0) {
        res.json({ result: true, message: "Admin supprimé" });
      } else {
        res.json({ result: false, message: "Aucun admin trouvé avec cet ID" });
      }
    });
  }
});

// Route pour modifier les infos d'un admin (via son token)
router.put("/updateByToken", (req, res) => {
  const mandatoryFields = ["token"];

  // Vérification de la présence des données
  if (!checkBodyModify(req.body, mandatoryFields)) {
    res.json({ result: false, message: "Token manquant ou vide" });
  } else {
    let modifiedObject = {};

    // Modification de firstName
    if (req.body.firstName) {
      modifiedObject.firstName = req.body.firstName;
    }

    // Modification de lastName
    if (req.body.lastName) {
      modifiedObject.lastName = req.body.lastName;
    }

    // Modification de position
    if (req.body.position) {
      modifiedObject.position = req.body.position;
    }

    // Modification de role
    if (req.body.role) {
      modifiedObject.role = req.body.role;
    }

    // Modification de pictureUrl
    if (req.body.pictureUrl) {
      modifiedObject.pictureUrl = req.body.pictureUrl;
    }

    // Modification de email
    if (req.body.email) {
      modifiedObject.email = req.body.email;
    }

    // Modification de etablissement
    if (req.body.etablissement) {
      modifiedObject.etablissement = req.body.etablissement;
    }

    // Modification de password
    if (req.body.password) {
      modifiedObject.password = bcrypt.hashSync(req.body.password, 10);
    }

    Admin.updateOne({ token: req.body.token }, modifiedObject).then((data) => {
      if (data.modifiedCount === 1) {
        res.json({ result: true, modifiedFields: Object.keys(modifiedObject) });
      } else {
        res.json({ result: false, message: "Aucun champ modifié" });
      }
    });
  }
});

module.exports = router;
