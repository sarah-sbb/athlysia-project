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
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
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
      <a
        href={`/participant/delete/${params.row.id}`}
        style={{ textDecoration: 'none', color: 'red' }}
      >
        Delete
      </a>
    ),
  },
];

const initialRows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [rows, setRows] = useState(initialRows);
  const [idCounter, setIdCounter] = useState(initialRows.length + 1);

  const addParticipant = (firstName, lastName, age) => {
    setRows([
      ...rows,
      {
        id: idCounter,
        firstName,
        lastName,
        age,
      },
    ]);
    setIdCounter(idCounter + 1);
  };

  const editParticipant = (id, updatedData) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, ...updatedData } : row)));
  };

  const deleteParticipant = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rows ? rows.length : 0}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}


// import React, { useState } from 'react';
// import styles from '../styles/Participants.module.css';
// import Table from './Table';

// function Participants() {
//   const [participants, setParticipants] = useState([
//     { name: 'Albert' },
//     { name: 'Einstein' },
//     { name: 'Homer' },
//     { name: 'Marge' },
//     { name: 'Bart' },
//     { name: 'Malcolm' }
//   ]);

//   const addParticipant = () => {
    
//   };

//   const editParticipant = () => {
    
//   };

//   const deleteParticipant = () => {
    
//   };

//   const searchParticipant = () => {
   
//   };

//   return (
//     <div className={styles.centered}>
//       <header className={styles.headerContainer}>
//         Participant
//       </header>
//       <Table
//         participants={participants}
//         addParticipant={addParticipant}
//         editParticipant={editParticipant}
//         deleteParticipant={deleteParticipant}
//         searchParticipant={searchParticipant}
//       />
//     </div>
//   );
// }

// export default Participants;