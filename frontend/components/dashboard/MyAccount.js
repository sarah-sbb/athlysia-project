import styles from "../../styles/dashboard.module.css";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function MyAccountWidget() {
  // Récupération de l'ID établissement
  const etablissementId = useSelector(
    (state) => state.admin.value.etablissement
  );

  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:3000/admins/findAllByEtablissement/${etablissementId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setAdmins(
            data.data.map((e) => ({
              id: e._id,
              role: e.role,
            }))
          );
        }
      });
  }, []);

  // Calcul du nombre de chaque type d'admins
  let nbAdmins = admins.filter((e) => e.role === "Admin").length;
  let nbGestionnaires = admins.filter((e) => e.role === "Gestionnaire").length;
  let nbViewers = admins.filter((e) => e.role === "Viewer").length;

  return (
    <div>
      <h2>Mon compte CheckToPic</h2>
      <ul>
        <li className={styles.listItem}>
          Admins : <span style={{ fontWeight: "bold" }}>{nbAdmins}</span>/4
        </li>
        <li className={styles.listItem}>
          Gestionnaires :{" "}
          <span style={{ fontWeight: "bold" }}>{nbGestionnaires}</span>/10
        </li>
        <li className={styles.listItem}>
          Viewers : <span style={{ fontWeight: "bold" }}>{nbViewers}</span>/50
        </li>
      </ul>
      <p>
        Id incididunt cillum exercitation sit nisi esse magna adipisicing
        laboris in officia amet sit sunt. Consequat aliqua nisi irure nulla
        reprehenderit ex non nisi esse cillum et quis commodo.
      </p>
      <div className={styles.myAccountButtonContainer}>
        <Button variant="outlined" sx={button}>
          Bouton A
        </Button>
        <Button variant="outlined" sx={button}>
          Bouton B
        </Button>
      </div>
    </div>
  );
}

const button = {
  color: "#031EAD",
  fontSize: "0.90rem",
  width: "50%",
  marginRight: "20px",
  borderColor: "#031EAD",
};

export default MyAccountWidget;
