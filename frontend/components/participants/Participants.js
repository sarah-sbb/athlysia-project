import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

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
      <a href={`/participants/modify/${params.row.id}`} style={{ color: 'blue' }}>
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
      .then((data) => {
        setRows(data.participants.map((e) => ({
          id: e._id,
          firstName: e.firstName,
          lastName: e.lastName,
          age: e.birthDate
        })))
      })
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
      <DataGrid 
      rows={rows} 
      columns={columns} 
      pageSizeOptions={[5, 10]} 
      checkboxSelection />
    </Paper>
  );
}
