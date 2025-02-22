import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

// Colonnes pour afficher la bonne structure des données
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Nom du groupe', width: 200 },
  { field: 'otherField', headerName: 'Autre champ', width: 200 }, // Adaptez les colonnes selon vos données
];

function Events() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const etablissementId = "67a73c9ebdc534b0b477c7d9"; // Assurez-vous que cet ID est valide
    
    const url = `http://localhost:3001/events/groupsByEtablissement/${etablissementId}`;
  
    // Déboguer l'URL générée
    console.log(`Fetching URL: ${url}`);
  
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          // Gestion d'erreur spécifique à une réponse 404 ou autre erreur serveur
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Debug: Voir les données reçues
        console.log("Received data:", data);
        if (data.result) {
          setRows(data.data); // Si succès, peupler les données
        } else {
          console.error("Aucun groupe trouvé.");
          setRows([]); // Vider les données si aucun groupe
        }
      })
      .catch((error) => {
        // Gestion des erreurs génériques
        console.error('Erreur lors de la récupération des groupes:', error);
      });
  }, []);
  

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10]} checkboxSelection />
    </Paper>
  );
}

export default Events;