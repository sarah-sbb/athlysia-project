import styles from "../../styles/adminProfile.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function AdminProfileEvents() {
  // Récupération du token depuis redux
  const token = useSelector((state) => state.admin.value.token);

  // Infos events
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
      <li className={styles.eventList}>
        {e.title} - Lieu : {e.place} - Date : {e.dateStart}
      </li>
    );
  });

  return (
    <div>
      {eventsData.length === 0 ? <span>Aucune sortie</span> : eventsList}
    </div>
  );
}

export default AdminProfileEvents;
