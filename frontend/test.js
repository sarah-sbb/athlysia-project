import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import moment from "moment";

const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: "Titre de l'évènement", width: 200 },
  { field: 'author', headerName: 'Auteur', width: 200 },
  { field: 'createdAt', headerName: 'Date de sortie', width: 130 },
  { field: 'acceptRate', headerName: "Taux d'acceptation", width: 200 },
];

const Events = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const etablissementId = "12345"; // Exemple d'ID

    fetch(`http://localhost:3000/findAllByEtablissement/${etablissementId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur serveur lors de la récupération des événements !");
        }
        return response.json();
      })
      .then((data) => {
        if (data.result) {
          setRows(
            data.data.map((element) => ({
              _id: element._id,
              title: element.title,
              author: element.author,
              createdAt: moment(element.createdAt).format("LLLL"),
              acceptRate: Math.round(
                (element.authorisations.filter((auth) => auth.accepted).length /
                  element.authorisations.length) *
                  100
              ),
            }))
          );
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Erreur API :", error);
      });
  }, []); // Notez l'utilisation de [] pour ne pas boucler à l'infini.

  return (
    <div>
      <h1>Liste des événements</h1>
      <Paper elevation={3} style={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </Paper>
    </div>
  );
};

export default Events;