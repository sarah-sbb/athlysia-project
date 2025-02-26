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

function Groups() {
    const [rows, setRows] = useState([]);
  // Récupère l'ID du groupe depuis le state Redux
  const etablissementId = useSelector(
    (state) => state.admin.value.etablissement 
  );

  // Récupération des groupes au chargement du composant
  useEffect(() => {
    fetch(`/api/groups/findAllByEtablissement/${etablissementId}`)
      .then((response) => {
        console.log("Réponse du serveur : ", response);
        if (!response.ok) {
          throw new Error("Erreur serveur lors de la récupération des groupes !");
        }
        return response.json(); // Transforme la réponse en JSON
      })
      .then((data) => {
        // Vérifiez si 'data.result' est true (succès)
        if (data.result) {
          if (data.data.length === 0) {
            console.log("Aucun groupe trouvé pour cet établissement.");
          } else {
            setGroups(data.data); // Stocke correctement les groupes (non vide)
          }
        } else {
          throw new Error(data.message || "Erreur inconnue côté serveur.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération : ", error.message);
      });
  }, []);


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

export default Groups;