var express = require("express");
var router = express.Router();
const Admin = require("../models/admins");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const { checkBody } = require("../modules/checkBody");

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
        res.json({
          result: false,
          message: "Aucun admin trouvé - mot de passe ou email incorrect",
        });
      }
    });
  }
});

// Route pour rechercher un admin en particulier (à partir de l'email)

router.post("/findByEmail", (req, res) => {
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

// Route pour modifier les infos d'un admin (via son ID)
router.put("/updateById", (req, res) => {
  const mandatoryFields = ["adminId"];

  // Vérification de la présence des données
  if (!checkBody(req.body, mandatoryFields)) {
    res.json({ result: false, message: "ID manquant ou vide" });
  } else {
    let updatedFields = [];

    // Modification de firstName
    if (req.body.firstName) {
      Admin.updateOne({
        id: req.body.adminId,
        firstName: req.body.firstName,
      }).then((data) => {
        if (data.modifiedCount === 1) {
          updatedFields.push("firstName");
        } 
      });
    }

    // Modification de function
    else if (req.body.function) {
      Admin.updateOne({
        id: req.body.adminId,
        function: req.body.function,
      }).then((data) => {
        if (data.modifiedCount === 1) {
          updatedFields.push("function");
        }
      });
    }

    // Modification de role
    else if (req.body.role) {
      Admin.updateOne({
        id: req.body.adminId,
        role: req.body.role,
      }).then((data) => {
        if (data.modifiedCount === 1) {
          updatedFields.push("role");
        }
      });
    }

    // Modification de pictureUrl
    else if (req.body.pictureUrl) {
      Admin.updateOne({
        id: req.body.adminId,
        pictureUrl: req.body.pictureUrl,
      }).then((data) => {
        if (data.modifiedCount === 1) {
          updatedFields.push("pictureUrl");
        }
      });
    }

    // Modification de pictureUrl
    else if (req.body.pictureUrl) {
      Admin.updateOne({
        id: req.body.adminId,
        pictureUrl: req.body.pictureUrl,
      }).then((data) => {
        if (data.modifiedCount === 1) {
          updatedFields.push("pictureUrl");
        }
      });
    }

     // Modification de email
     else if (req.body.email) {
      Admin.updateOne({
        id: req.body.adminId,
        email: req.body.email,
      }).then((data) => {
        if (data.modifiedCount === 1) {
          updatedFields.push("email");
        }
      });
    }

    // Modification de etablissement
    else if (req.body.etablissement) {
      Admin.updateOne({
        id: req.body.adminId,
        etablissement: req.body.etablissement,
      }).then((data) => {
        if (data.modifiedCount === 1) {
          updatedFields.push("etablissement");
        }
      });
    }

    // Modification de password
    else if (req.body.etablissement) {
      Admin.updateOne({
        id: req.body.adminId,
        password: bcrypt.hashSync(req.body.password, 10),
      }).then((data) => {
        if (data.modifiedCount === 1) {
          updatedFields.push("password");
        }
      });
    }

    if (updatedFields.length > 0) {
      res.json({ result: true, updatedFields })
    } else {
      res.json({ result: false, message: "Aucun champ modifié"})
    }
  }
});

module.exports = router;
