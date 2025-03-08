import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Paper from "@mui/material/Paper";
import moment from "moment";
import "moment/locale/fr";
import { frFR } from "@mui/x-data-grid/locales";

function AllGroups() {
  // Récupération de l'ID établissement depuis redux
  const etablissementId = useSelector((state) => state.admin.value.etablissement);

  // State pour stocker les données groupes
  const [groupsData, setGroupsData] = useState([]);

  // Récupération des infos relatives aux groupes gérés par l'admin
  useEffect(() => {
    fetch(`http://localhost:3000/groups/findAllByEtablissementWithParticipantInfos/${etablissementId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setGroupsData(
            data.data.map((element) => ({
              id: element._id,
              groupName: element.title,
              participantPics: element.participantIds,
              createdAt: moment(element.createdAt).format("LLLL"),
            }))
          );
        }
      });
  }, []);

  // Initialisation du tableau pour afficher les résultats (colonnes)
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "groupName",
      headerName: "Groupe",
      width: 300,
      editable: false,
    },
    {
      field: "participantPics",
      headerName: "Participants",
      width: 300,
      editable: false,
      renderCell: (params) => (
        // Fonction pour transformer le tableau des pictureUrl participants en un groupe d'avatars capés à 4 (flex-end pour forcer l'alignement à gauche)
        <AvatarGroup max={4} style={{ justifyContent: "flex-end" }}>
          {params.value.map((e) => (
            <Avatar src={e.pictureUrl} />
          ))}
        </AvatarGroup>
      ),
    },
    {
      field: "createdAt",
      headerName: "Date de création",
      width: 300,
      editable: false,
    },
  ];

  return (
    <div>
      {groupsData.length === 0 ? (
        <span>Aucun groupe dans mon établissement</span>
      ) : (
        <Paper>
          <DataGrid
            columnVisibilityModel={{
              // Cache la colonne ID
              id: false,
            }}
            rows={groupsData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
          />
        </Paper>
      )}
    </div>
  );
}

export default AllGroups;
