import styles from "../../styles/adminProfile.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/fr";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Gauge } from "@mui/x-charts/Gauge";
import Stack from "@mui/material/Stack";

function AdminProfileEvents() {
  // Récupération du token depuis redux
  const token = useSelector((state) => state.admin.value.token);

  // Stockage infos events + participants
  const [eventsData, setEventsData] = useState([]);

  // Récupération des infos relatives aux events gérés par l'admin
  useEffect(() => {
    fetch(
      `http://localhost:3000/events/eventsByAdminWithParticipantInfos/${token}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setEventsData(
            data.data.map((element) => ({
              id: element._id,
              eventTitle: element.title,
              participants: element.authorisations,
              nbParticipants: element.authorisations.length, // Calcul du nombre de participants
              validatedAuths: element.authorisations.filter(
                (e) => e.isValidated
              ).length, // Calcul du nombre d'autorisations validées
              place: element.place,
              dateStart: moment(element.dateStart).format("LL"),
            }))
          );
        }
      });
  }, []);

  // Initialisation du tableau pour afficher les résultats (colonnes)
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "eventTitle",
      headerName: "Nom de l'événement",
      width: 300,
      editable: false,
    },
    {
      field: "participants",
      headerName: "Participants",
      width: 150,
      editable: false,
      renderCell: (params) => (
        // Fonction pour transformer le tableau des pictureUrl participants en un groupe d'avatars capés à 4 (flex-end pour forcer l'alignement à gauche)
        <AvatarGroup max={4} style={{ justifyContent: "flex-end" }}>
          {params.value.map((e) => (
            <Avatar src={e.participant.pictureUrl} />
          ))}
        </AvatarGroup>
      ),
    },
    {
      field: "rate",
      headerName: "Taux de validation",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <Gauge
          width={60}
          height={60}
          value={Math.round(params.row.validatedAuths/params.row.nbParticipants*100)} // Calcul du taux de validation
          startAngle={-90}
          endAngle={90}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ),
    },
    {
      field: "place",
      headerName: "Lieu de l'événément",
      width: 150,
      editable: false,
    },
    {
      field: "dateStart",
      headerName: "Date de l'évément",
      width: 150,
      editable: false,
    },
  ];

  console.log(eventsData);

  return (
    <div>
      {eventsData.length === 0 ? (
        <span>Aucun événement</span>
      ) : (
        <Paper>
          <DataGrid
            columnVisibilityModel={{
              // Cache la colonne ID
              id: false,
            }}
            rows={eventsData}
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
      )}
    </div>
  );
}

export default AdminProfileEvents;
