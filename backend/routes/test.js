router.get("/eventsByAdmin/:token", (req, res) => {
    const fields = ["token"];
  
    // Vérification de la présence des données
    if (!checkBody(req.params, fields)) {
      res.json({ result: false, message: "Champs manquants ou vides" });
    } else {
      // Récupération de l'admin à partir de son token
      Admin.findOne({ token: req.params.token })
        .then((admin) => {
          if (!admin) {
            res.json({
              result: false,
              message: "Aucun admin trouvé avec ce token",
            });
          } else {
            // Récupération des événements associés à l'admin
            Event.find({ adminId: admin._id })
              .then((events) => {
                if (events.length === 0) {
                  res.json({
                    result: false,
                    message: "Aucun événement trouvé pour cet admin",
                  });
                } else {
                  res.json({ result: true, data: events });
                }
              })
              .catch((error) => {
                res.json({
                  result: false,
                  message: "Erreur lors de la récupération des événements",
                  error: error.message,
                });
              });
          }
        })
        .catch((error) => {
          res.json({
            result: false,
            message: "Erreur lors de la récupération de l'admin",
            error: error.message,
          });
        });
    }
  });
  