/* 
Gilliane tu as mis 2 fois export default c'est pour cela que ça ne fonctionne pas 
Concernant les const columns et rows, on peut te montrer une petite astuce pour que se soit plus simple
Tu peux regarder dans le dossier : frontend/data, il y a 2 fichiers de créé pour gérer les tableaux d'objets. 
le navbarData.js est ensuite importé dans components/layout/Navbar.js pour afficher les données de ce tableau 
Plus simple, celui des titles (pageTitle.js) est importé dans components/layout/Layout.js 
On appelle cela mapper les données. C'est assez simple et très pratique. Ca permettra d'alléger ton fichier. 
Je t'invite également à regarder mon github : https://github.com/sarah-sbb/P5_Kasa
Même logique avec le accordion src/components/Accordions.js qui est juste la structure
Puis dans src/pages/About.js tu le retrouves avec ces données. Là j'ai pas fait de dossier "data" pour ce projet 
car le fichier ne faisait que 40 lignes. 
Si ça peut t'aider à y voir plus clair dans ton code. 
*/ 

//import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  {
    field: 'modify',
    headerName: 'Modify',
    width: 130,
    renderCell: (params) => (
      <a href={`/ctp-admin/participants/modify/${params.row.id}`} style={{ color: 'blue' }}>
        Modify
      </a>
    ),
  },
  {
    field: 'delete',
    headerName: 'Delete',
    width: 130,
    renderCell: (params) => (
      <button onClick={() => handleDelete(params.row.id)} style={{ color: 'red', border: 'none', background: 'none' }}>
        Delete
      </button>
    ),
  },
];

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/participants') // Adjust URL based on your backend
      .then((response) => {
        setRows(response.data.participants);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching participants:', error));
  }, []);

  // Function to delete participant
  const handleDelete = (id) => {
    axios.get(`http://localhost:3001/participants/delete/${id}`)
      .then(() => {
        setRows(rows.filter(row => row.id !== id));
      })
      .catch((error) => console.error('Error deleting participant:', error));
  };

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

