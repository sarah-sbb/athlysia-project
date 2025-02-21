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
          // On utilise flatmap pour récupérer tous les autorisations puis les fusionner au sein d'un même tableau
          const allAutorisations = data.data.flatMap((event) =>
            event.authorisation.map((auth) => ({
              participant: auth.participant,
              isValidated: auth.isValidated,
              title: event.title,
            }))
          );
          setAutorisationsData(allAutorisations);
        }
      });
  }, []);

  // Transformation des données brutes des autorisations pour affichage
  autorisationsList = autorisationsData.map((e) => {
    return (
      <li className={styles.eventList}>
        Participant: {e.participant} - Evenement: {e.title} - Statut :{" "}
        {e.isValidated ? "Validé" : "En attente"}
      </li>
    );
  });

  return <div>{autorisationsList}</div>;
}

export default AdminProfileAuthorizations;
