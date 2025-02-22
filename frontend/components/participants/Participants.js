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
// import LargeButtonRed from '../smallComponents/LargeButtonRed';
// import LargeButtonWhite from '../smallComponents/LargeButtonWhite';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
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
      <button onClick={() => deleteParticipant(params.row.id)} style={{ color: 'red' }}>
        Delete
      </button>
    ),
  },
];

export default function DataTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/participants')
      .then((response) => response.json())
      .then((data) => setRows(data.participants))
      .catch((error) => console.error('Erreur lors du fetch de participant', error));
  }, []);

  const deleteParticipant = async (id) => {
    const response = await fetch(`http://localhost:3000/participants/delete/:id`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setRows(rows.filter((row) => row.id !== id));
    } else {
      console.error('Participants non trouvés');
    }
  };

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10]} checkboxSelection />
    </Paper>
  );
}


