import styles from "../../styles/adminProfile.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function AdminProfileAuthorizations() {
  // Récupération du token admin depuis redux
  const token = useSelector((state) => state.admin.value.token);

  // Stockage des infos autorisations
  const [autorisationsData, setAutorisationsData] = useState([]);
  let autorisationsList = [];

  // Récupération des infos relatives aux autorisations des events gérés par l'admin
  useEffect(() => {
    fetch(
      `http://localhost:3000/events/autorisationsByEventViaAdminToken/${token}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setAutorisationsData(
            data.data[0].authorisation.map((element) => ({
              participant: element.participant,
              isValidated: element.isValidated,
            }))
          );
        }
      });
  }, []);

  console.log(autorisationsData) // ❌Vide!

  // Transformation des données brutes des autorisations pour affichage
  autorisationsList = autorisationsData.map((e) => {
    return (
      <li className={styles.eventList}>
        Participant: {e.participant} - Statut : {e.isValidated}
      </li>
    );
  });

  return <div>{autorisationsList}</div>;
}

export default AdminProfileAuthorizations;
