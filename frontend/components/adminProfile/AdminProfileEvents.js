import styles from "../../styles/adminProfile.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function AdminProfileEvents() {
  // Récupération du token depuis redux
  const token = useSelector((state) => state.admin.value.token);

  // Stockage infos events
  const [eventsData, setEventsData] = useState([]);
  let eventsList = [];

  // Récupération des infos relatives aux events gérés par l'admin
  useEffect(() => {
    fetch(`http://localhost:3000/events/eventsByAdmin/${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setEventsData(
            data.data.map((element) => ({
              title: element.title,
              place: element.place,
              dateStart: element.dateStart,
            }))
          );
        }
      });
  }, []);

  // Transformation des données brutes des events pour affichage
  eventsList = eventsData.map((e) => {
    return (
      <tr>
        <td className={styles.td}>{e.title}</td>
        <td className={styles.td}>{e.place}</td>
        <td className={styles.td}>{e.dateStart}</td>
      </tr>
    );
  });

  return (
    <div>
      {eventsList.length === 0 ? (
        <span>Aucun évenement</span>
      ) : (
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th scope="col">Evenement</th>
              <th scope="col">Lieu</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>{eventsList}</tbody>
        </table>
      )}
    </div>
  );
}

export default AdminProfileEvents;
