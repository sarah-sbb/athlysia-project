import styles from "../../styles/adminProfile.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import moment from 'moment';
import 'moment/locale/fr';

function AdminProfileGroups() {
  // Récupération du token depuis redux
  const token = useSelector((state) => state.admin.value.token);

  // State pour stocker les données groupes
  const [groupsData, setGroupsData] = useState([]);

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
              id: element._id,
              groupName: element.title,
              nbParticipants: element.participantIds.length,
              createdAt: moment(element.createdAt).format('LLLL')
            }))
          );
        }
      });
  }, []);

  // Initialisation du tableau pour afficher les résultats (colonnes)
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "groupName",
      headerName: "Groupe",
      width: 300,
      editable: false,
    },
    {
      field: "nbParticipants",
      headerName: "Nombre de participants",
      width: 300,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Date de création",
      width: 300,
      editable: false,
    },
  ];


  return (
    <Paper>
      {/* {groupsList.length === 0 ? (
        <span>Aucun groupe</span>
      ) : (
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Nombre de participants</th>
            </tr>
          </thead>
          <tbody>{groupsList}</tbody>
        </table>
      )} */}
      <DataGrid
        columnVisibilityModel={{
          // Cache la colonne ID
          id:false
        }}
        rows={groupsData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Paper>
  );
}

export default AdminProfileGroups;
