//import styles from '../../styles/Groups.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'Name', headerName: "Titre du groupe", width: 200 },
  { field: 'Author', headerName: 'Auteur', width: 200 },
  { field: 'Date', headerName: 'Date de sortie', type: 'date', width: 130 },
  { field: 'Participants', headerName: "Nombre de participant", width: 200 },
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

export default function GroupsTable() {
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

  fetch(`http://localhost:3000/groups/findAllByEtablissement/${etablissementId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data && Array.isArray(data.groups)) {
        setRows(data.groups.map(e => ({
          id: e._id,
          Name: e.Name,
          Author: e.Author,
          Date: e.Date,
          Participants: e.Participants,
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