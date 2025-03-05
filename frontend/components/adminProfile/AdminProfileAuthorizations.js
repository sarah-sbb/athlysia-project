import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Tooltip from '@mui/material/Tooltip';
import { frFR } from "@mui/x-data-grid/locales";

function AdminProfileAuthorizations() {
  // Récupération du token admin depuis redux
  const token = useSelector((state) => state.admin.value.token);

  // Stockage des infos autorisations
  const [autorisationsData, setAutorisationsData] = useState([]);
  let allAutorisations = [];

  // Récupération des infos relatives aux autorisations des events gérés par l'admin
  useEffect(() => {
    fetch(
      `http://localhost:3000/events/eventsByAdminWithParticipantInfos/${token}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // On utilise flatmap pour récupérer tous les autorisations puis les fusionner au sein d'un même tableau
          allAutorisations = data.data.flatMap((event) =>
            event.authorisations.map((auth) => ({
              id: `${event._id}-${auth._id}`, // Clé unique combinant événement + autorisation
              participant: `${auth.participant.firstName} ${auth.participant.lastName}`, // Concaténation pour obtenir rapidement le nom complet
              participantPic: auth.participant.pictureUrl,
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
      field: "participantPic",
      headerName: "",
      width: 100,
      editable: false,
      renderCell: (params) => (
        <Avatar src={params.value} />
      ),
    },
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
      renderCell: (params) => {
        if (params.value) {
          return <span style={{color:"green"}}>Validé</span>
        } else {
          return <div><span style={{color:"red"}}>En attente</span><Tooltip title="Relancer">
          <IconButton>
            <NotificationsNoneIcon />
          </IconButton>
          </Tooltip></div>
        }
      }
    },
  ];


  return (
    <div>
      {autorisationsData.length === 0 ? (
        <span>Aucune autorisation</span>
      ) : (
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
            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
          />
        </Paper>
      )}
    </div>
  );
}

export default AdminProfileAuthorizations;
