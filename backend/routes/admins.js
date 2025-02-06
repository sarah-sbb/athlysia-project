var express = require("express");
var router = express.Router();
const Admin = require("../models/admins");
const uid2 = require("uid2");
const { checkBody } = require("../modules/checkBody");

// Route pour l'ajout d'un admin en BDD (signup)
router.post("/signup", (req, res) => {
  const signupFields = ["firstName", "lastName", "function", "role", "pictureUrl", "email", "password"];

  // Vérification de la présence des données
  if (!checkBody(req.body, signupFields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    // Check si l'admin n'existe pas déjà via son email
    Admin.findOne({email: req.body.email}).then((response) => {
      if (response) {
        res.json({ result: false, message: "Admin existe déjà en BDD"})
      } else {
        // Enregistrement de l'admin en BDD
        const newAdmin = new Admin({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          function: req.body.function,
          role: req.body.role,
          pictureUrl: req.body.pictureUrl,
          email: req.body.email,
          password: req.body.password,
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
  const signinFields = ["email", "password"];

  // Vérification de la présence des données
  if (!checkBody(req.body, signinFields)) {
    res.json({ result: false, message: "Champs manquants ou vides" });
  } else {
    Admin.findOne({email: req.body.email, password: req.body.password}).then((response) => {
      if (!response) {
        res.json({ result: false, message: "Aucun admin trouvé"})
      } else {
        res.json({ result: true, token: response.token })
      }
    })
  }
});

/* GET admins listing. */
router.get("/", function (req, res) {});

module.exports = router;