import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import moment from "moment";

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

function Events() {
  const [rows, setRows] = useState([]);
  // Récupère l'ID de l'établissement depuis le state Redux
  const etablissementId = useSelector(
    (state) => state.admin.value.etablissement 
  );

  // Récupération des événements au chargement du composant
  useEffect(() => {
    fetch(`/api/events/findEventsByEtablissement/${etablissementId}`)
      .then((response) => {
        console.log("Réponse du serveur : ", response);
        if (!response.ok) {
          throw new Error("Erreur serveur lors de la récupération des événements !");
        }
        return response.json(); // Transforme la réponse en JSON
      })
      .then((data) => {
        // Vérifiez si 'data.result' est true (succès)
        if (data.result) {
          if (data.data.length === 0) {
            console.log("Aucun événement trouvé pour cet établissement.");
          } else {
            setEvents(data.data); // Stocke correctement les événements (non vide)
          }
        } else {
          throw new Error(data.message || "Erreur inconnue côté serveur.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération : ", error.message);
      });
  }, []);  

  // Suppression d'un événement
  // const deleteEvent = async (id) => {
  //   const response = await fetch(
  //     `http://localhost:3000/events/delete/${eventId}`,
  //     {
  //       method: "DELETE",
  //     }
  //   );

  //   if (response.ok) {
  //     // Si suppression réussie, mettre à jour les lignes en supprimant celle supprimée
  //     setRows(rows.filter((row) => row.id !== id));
  //   } else {
  //     console.error('Événement non trouvé ou erreur dans la suppression.');
  //   }
  // };

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

export default Events;