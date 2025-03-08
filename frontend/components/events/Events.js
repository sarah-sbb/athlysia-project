//import styles from '../../styles/Groups.module.css';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { frFR } from "@mui/x-data-grid/locales";
import Modify from "./Modify";
import Paper from "@mui/material/Paper";
import moment from "moment";
import "moment/locale/fr";

function AllEvents() {
  //A. Redux
  // Récupère l'ID de l'établissement depuis le state Redux
  const etablissementId = useSelector(
  (state) => state.admin.value.etablissement 
  );

  //B. States
  const [open, setOpen] = useState(false);
  const [idEvent, setIdEvent] = useState("");
  const [eventsData, setEventsData] = useState([]);

  //C/ Logique
  useEffect(() => {
    fetch(
      `http://localhost:3000/events/findEventsByEtablissement/${etablissementId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setEventsData(
            data.data.map((e) => ({
              id: e._id,
              eventName: e.title,
              auteurName: `${e.adminId.firstName + " " + e.adminId.lastName}`,
              participantNumber: e.participantIds.length,
              createdAt: moment(e.createdAt).format("LLLL"),
            }))
          );
        }
      });
  }, []);

  const handleDeleteGroup = (id) => {
    fetch(`http://localhost:3000/groups/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setGroupsData(groupsData.filter((e) => e.id !== id));
      });
  };

  const handleToggleModal = (id) => {
    setIdGroup(id);
    setOpen(!open);
  };

  //D. Configuration du tableau
  const columns = [
    {
      field: "eventName",
      headerName: "Nom de l'évènement",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "eventName",
      headerName: "Evénement",
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "participantNumber",
      headerName: "Nbre de participants",
      width: 200,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "createdAt",
      headerName: "Date de création",
      width: 200,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            style={{
              marginRight: "10px",
              fontSize: "11px",
              backgroundColor: "#2E35B3",
            }}
            onClick={() => handleToggleModal(params.row.id)}
          >
            Modifier
          </Button>
          <Button
            variant="contained"
            onClick={() => handleDeleteGroup(params.row.id)}
            style={{ fontSize: "11px", backgroundColor: "#DC1C4D" }}
          >
            Supprimer
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {eventsData.length === 0 ? (
        <p>Aucun évènement</p>
      ) : (
        <Paper>
          <DataGrid
            rows={eventsData}
            columns={columns}
            loading={eventsData.length === 0}
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
      {open && idEvent ? (
        <Modify
          open={open}
          handleToggleModal={handleToggleModal}
          setIdEvent={setIdEvent}
          idGroup={idEvent}
        />
      ) : null}
    </div>
  );
}

export default AllEvents;