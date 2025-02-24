import styles from "../../styles/adminProfile.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/fr";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

function AdminProfileEvents() {
  // Récupération du token depuis redux
  const token = useSelector((state) => state.admin.value.token);

  // Stockage infos events + participants
  const [eventsData, setEventsData] = useState([]);

  // Récupération des infos relatives aux events gérés par l'admin
  useEffect(() => {
    fetch(`http://localhost:3000/events/eventsByAdminWithParticipantInfos/${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setEventsData(
            data.data.map((element) => ({
              id: element._id,
              eventTitle: element.title,
              participants: element.authorisations,
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
      width: 300,
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
      field: "place",
      headerName: "Lieu de l'événément",
      width: 300,
      editable: false,
    },
    {
      field: "dateStart",
      headerName: "Date de l'évément",
      width: 300,
      editable: false,
    },
  ];

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
