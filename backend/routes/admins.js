var express = require("express");
var router = express.Router();
const Admin = require("../models/admins");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const { checkBody } = require("../modules/checkBody");

// Route pour l'ajout d'un admin en BDD (signup)
router.post("/signup", (req, res) => {
  const fields = [
    "firstName",
    "lastName",
    "function",
    "role",
    "email",
    "password",
    "etablissement",
  ];

  // Vérification de la présence des données
  if (!checkBody(req.body, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
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
          function: req.body.function,
          role: req.body.role,
          pictureUrl: req.body.pictureUrl,
          etablissement: req.body.etablissement,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          token: uid2(32),
        });

        newAdmin.save().then((response) => {
          res.json({ result: true, token: response.token });
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
        res.json({ result: true, token: response.token });
      } else {
        res.json({ result: false, message: "Aucun admin trouvé - mot de passe ou email incorrect" });
      }
    });
  }
});

// Route pour rechercher un admin en particulier (à partir de l'email)

router.get("/findByEmail", (req, res) => {
  const fields = ["email"];

  // Vérification de la présence des données
  if (!checkBody(req.body, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    Admin.findOne({ email: req.body.email }).then((response) => {
      if (!response) {
        res.json({
          result: false,
          message: "Aucun admin trouvé avec cet email",
        });
      } else {
        res.json({ result: true, data: response });
      }
    });
  }
});

// Route pour rechercher tous les admins d'un établissement
router.get('/findAllByEtablissement', (req, res) => {
  const fields = ["etablissement"];

  // Vérification de la présence des données
  if (!checkBody(req.body, fields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
  Admin.find({ etablissement: req.body.etablissement }).then((data) => {
    if (data.length === 0) {
      res.json({ result: false, message: "Aucun admin sur cet établissement"})
    } else {
      res.json({ result: true, data})
    }
  })
  }
})

module.exports = router;
