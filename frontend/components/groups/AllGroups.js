//import styles from '../../styles/Groups.module.css';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { frFR } from "@mui/x-data-grid/locales"
import Paper from "@mui/material/Paper";
import moment from "moment";
import "moment/locale/fr";


 function AllGroups() {

 const admin = useSelector((state) => state.admin.value);


 const [groupsData, setGroupsData] = useState([]);

console.log(groupsData)

 useEffect(() => {
   fetch(`http://localhost:3000/groups/findAllGroupsByEtablissement/${admin.etablissement}`)
     .then((response) => response.json())
     .then((data) => {
       if (data.result) {
        console.log(data)
         setGroupsData(
           data.allGroups.map((e) => ({
            id: e._id,
             groupName: e.title,
             auteurName : `${e.adminId.firstName + " " + e.adminId.lastName}`,
             participantNumber: e.participantIds.length,
             createdAt: moment(e.createdAt).format("LLLL"),
           }))
         );
       }
     });
 }, []);

 
 const columns = [

   {
     field: "groupName",
     headerName: "Nom de groupe",
     width: 150,
     editable: false,
     headerAlign: "center",
     align: "center",
   },{
    field: "auteurName",
    headerName: "Auteur",
    width: 200,
    editable: false,
    headerAlign: "center",
    align: "center",
  },
   {
     field: "participantNumber",
     headerName: "Nbre de participants",
     width: 200,
     editable: false,
     align: "center",
     headerAlign: "center",
   },
   {
     field: "createdAt",
     headerName: "Date de création",
     width: 200,
     editable: false,
     align: "center",
     headerAlign: "center",
   },{
    field: "actions",
    headerName: "Actions",
    width: 300,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleEditGroup(params.row)}
        style={{ marginRight: "10px" , fontSize: "11px"}}
      >
        Modifier
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => handleDeleteGroup(params.row.id)}
        style={{ fontSize: "11px"}}
      >
        Supprimer
      </Button>
    </div>
      
    ),
  },
   
 ];

 return (
   <div>
     {groupsData.length === 0 ? (
       <p>Aucun groupe</p>
     ) : (
       <Paper>
         <DataGrid
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


export default AllGroups

