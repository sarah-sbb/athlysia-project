import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import styles from '../../styles/Events.module.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
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

function Events() {
  const [rows, setRows] = useState([]);

  // Récupération des événements au chargement du composant
  useEffect(() => {
    fetch('http://localhost:3001/events')
      .then((response) => response.json())
      .then((data) => setRows(data.events))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  // Suppression d'un événement
  const deleteEvent = async (id) => {
    const response = await fetch(`http://localhost:3001/events/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Si suppression réussie, mettre à jour les lignes en supprimant celle supprimée
      setRows(rows.filter((row) => row.id !== id));
    } else {
      console.error('Événement non trouvé ou erreur dans la suppression.');
    }
  };

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10]} checkboxSelection />
    </Paper>
  );
}

export default Events;