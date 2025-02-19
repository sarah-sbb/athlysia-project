import styles from "../../styles/adminProfile.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  Box,
  Button,
  TextField,
  // Typography,
  // Select,
  // InputLabel,
  // MenuItem,
  // FormControl,
} from "@mui/material";

function AdminProfileGroups() {

  // Récupération du token depuis redux
  const token = useSelector((state) => state.admin.value.token);

  // Infos groupes
  const [groupsData, setGroupsData] = useState([]);
  let groupsList = [];

  // Récupération des infos relatives aux groupes gérés par l'admin
  useEffect(() => {
    fetch("http://localhost:3000/groups/findAllGroupsByAdminToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setGroupsData(
            data.data.map((element) => ({
              title: element.title,
              nbParticipants: element.participantIds.length,
            }))
          );
        }
      });
  }, []);

  // Transformation des données brutes des groupes pour affichage
  groupsList = groupsData.map((e) => {
    return (
      <li className={styles.eventList}>
        {e.title} - {e.nbParticipants} participant(s)
      </li>
    );
  });

  return (
    <div>
      {groupsData.length === 0 ? <span>Aucun groupe</span> : groupsList}
    </div>
  );
}

export default AdminProfileGroups;
