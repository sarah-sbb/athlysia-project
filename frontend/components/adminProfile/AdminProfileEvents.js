import styles from "../../styles/adminProfile.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/fr";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { setRef } from "@mui/material";

function AdminProfileEvents() {
  // Récupération du token depuis redux
  const token = useSelector((state) => state.admin.value.token);

  // Stockage infos events + participants
  const [eventsData, setEventsData] = useState([]);
  const [participantsData, setParticipantsData] = useState([]);

  // const [participantsData, setParticipantsData] = useState([]);

  // Récupération des infos relatives aux events gérés par l'admin
  useEffect(() => {
    fetch(`http://localhost:3000/events/eventsByAdmin/${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setEventsData(
            data.data.map((element) => ({
              id: element._id,
              eventTitle: element.title,
              participants: element.authorisation,
              nbParticipants: element.authorisation.length,
              place: element.place,
              dateStart: moment(element.dateStart).format("LL"),
            }))
          );
          // for (let element of data.data) {
          //   for (let subelement of element.authorisation) {
          //     fetch(`http://localhost:3000/participants/${subelement.participant}`)
          //     .then(response => response.json())
          //     .then(data => {
          //       setParticipantsData([...participantsData, data])
          //     })
          //   }
          // }
        }
      });
  }, []);

  // //TEST
  // useEffect(() => {
  //   for (let element of eventsData) {
  //     for (let subelement of element.participants) {
  //       fetch(`http://localhost:3000/participants/${subelement.participant}`)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           if (data.result) {
  //             setEventsData(() => {
  //               for (let element of eventsData) {
  //                 element.id = data.participant._id,
  //                 element.pictureUrl = data.participant.pictureUrl
  //               }
  //             })
  //           }
  //         });
  //     }
  //   }
  // }, [eventsData]);

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
      field: "nbParticipants",
      headerName: "Nombre de participants",
      width: 300,
      editable: false,
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
