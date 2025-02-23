import styles from "../../styles/dashboard.module.css";
import { Button } from "@mui/material";

function MyAccountWidget() {
  return (
    <div>
      <h2>Mon compte CheckToPic</h2>
      <ul>
        <li className={styles.listItem}>Admins : <span style={{fontWeight: "bold"}}>2</span>/4</li>
        <li className={styles.listItem}>Gestionnaires : <span style={{fontWeight: "bold"}}>3</span>/10</li>
        <li className={styles.listItem}>Viewers : <span style={{fontWeight: "bold"}}>10</span>/50</li>
      </ul>
      <p>
        Id incididunt cillum exercitation sit nisi esse magna adipisicing
        laboris in officia amet sit sunt. Consequat aliqua nisi irure nulla
        reprehenderit ex non nisi esse cillum et quis commodo.
      </p>
      <div className={styles.myAccountButtonContainer}>
      <Button variant="outlined" sx={button}>Bouton A</Button>
      <Button variant="outlined" sx={button}>Bouton B</Button>
      </div>
    </div>
  );
}

const button = {
    color: "#031EAD",
    fontSize: "0.90rem",
    width: "50%",
    marginRight: "20px",
    borderColor: "#031EAD"
  };

export default MyAccountWidget;
