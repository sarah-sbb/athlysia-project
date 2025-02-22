import styles from "../../styles/adminProfile.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

function AdminProfileAuthorizations() {
  // Récupération du token admin depuis redux
  const token = useSelector((state) => state.admin.value.token);

  // Stockage des infos autorisations
  const [autorisationsData, setAutorisationsData] = useState([]);
  let allAutorisations = [];

  // Récupération des infos relatives aux autorisations des events gérés par l'admin
  useEffect(() => {
    fetch(`http://localhost:3000/events/eventsByAdmin/${token}`)
      .then((response) => response.json())
      .then((data) => {
        // RAF: ajouter les photos participants
        if (data.result) {
          // On utilise flatmap pour récupérer tous les autorisations puis les fusionner au sein d'un même tableau
          allAutorisations = data.data.flatMap((event) =>
            event.authorisation.map((auth) => ({
              id: auth._id,
              participant: auth.participant,
              isValidated: auth.isValidated,
              eventTitle: event.title,
            }))
          );
          setAutorisationsData(allAutorisations);
        }
      });
  }, []);

  // Initialisation du tableau pour afficher les résultats (colonnes)
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "participant",
      headerName: "Participant",
      width: 300,
      editable: false,
    },
    {
      field: "eventTitle",
      headerName: "Evénement",
      width: 300,
      editable: false,
    },
    {
      field: "isValidated",
      headerName: "Statut de l'autorisation",
      width: 300,
      editable: false,
    },
  ];

  // // Transformation des données brutes des autorisations pour affichage
  // autorisationsList = autorisationsData.map((e) => {
  //   return (
  //     <tr>
  //       <td className={styles.td}>{e.participant}</td>
  //       <td className={styles.td}>{e.title}</td>
  //       <td className={styles.td}>{e.isValidated ? "Validé" : "En attente"}</td>
  //     </tr>
  //   );
  // });

  return (
    <Paper>
      <DataGrid
        columnVisibilityModel={{
          // Cache la colonne ID
          id: false,
        }}
        rows={autorisationsData}
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

export default AdminProfileAuthorizations;
