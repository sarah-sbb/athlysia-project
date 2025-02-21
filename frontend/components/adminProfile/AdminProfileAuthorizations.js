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
      <tr>
      <td className={styles.td}>{e.participant}</td>
      <td className={styles.td}>{e.title}</td>
      <td className={styles.td}>{e.isValidated ? "Validé" : "En attente"}</td>
    </tr>
    );
  });

  return (
    <div>
      {autorisationsList.length === 0 ? <span>Aucune autorisation</span> : <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th scope="col">Evenement</th>
            <th scope="col">Participant</th>
            <th scope="col">Statut</th>
          </tr>
        </thead>
        <tbody>
          {autorisationsList }
        </tbody>
      </table>}
    </div>
  );
}

export default AdminProfileAuthorizations;
