import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

//import styles from '../../styles/Events.module.css';

const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'Name', headerName: "Titre de l'évènement", width: 200 },
  { field: 'Author', headerName: 'Auteur', width: 200 },
  { field: 'Date', headerName: 'Date de sortie', type: 'date', width: 130 },
  { field: 'Accept', headerName: "Taux d'acceptation", width: 200 },
  {
    field: 'modify',
    headerName: 'Modify',
    width: 130,
    renderCell: (params) => (
      <a href={`/ctp-admin/events/modify/${params.row.id}`} style={{ color: 'blue' }}>
        Modify
      </a>
    ),
  },
  {
    field: 'delete',
    headerName: 'Delete',
    width: 130,
    renderCell: (params) => (
      <button onClick={() => deleteEvent(params.row.id)} style={{ color: 'red' }}>
        Delete
      </button>
    ),
  },
];

export default function EventsTable() {
  const [rows, setRows] = useState([]);

// Récupère l'ID de l'établissement depuis le state Redux
const etablissementId = useSelector(
(state) => state.admin.value.etablissement 
);

useEffect(() => {
  if (!etablissementId) {
    console.error("Erreur : etablissementId est requis.");
    return;
  }

  fetch(`http://localhost:3000/events/findEventsByEtablissement/${etablissementId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data && Array.isArray(data.events)) {
        setRows(data.events.map(e => ({
          id: e._id,
          Name: e.Name,
          Author: e.Author,
          Date: e.Date,
          Accept: e.Accept,
        })));
      } else {
        console.error("Format des données incorrect :", data);
      }
    })
    .catch(error => console.error("Erreur lors du fetch :", error));
}, [etablissementId]);

    return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id} // Utilisation de l'ID MongoDB comme identifiant unique
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Paper>
  );
}