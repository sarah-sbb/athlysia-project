import { useEffect, useState } from "react";
import styles from "../../styles/Groups.module.css";
import { useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";

function Modify({ open, handleToggleModal, idGroup, setIdGroup }) {
  const [participantData, setParticipantData] = useState([]);
  const [addParticipant, setAddParticipant] = useState("");
  const [oneGroupData, setOneGroupData] = useState("");
  const filtredData = participantData.map((participant) => ({
    label: `${participant.firstName} ${participant.lastName}`,
    id: participant._id,
  }));
  const admin = useSelector((state) => state.admin.value);

  useEffect(() => {
    fetch(
      `http://localhost:3000/participants/findAllByEtablissement/${admin.etablissement}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setParticipantData(data.allParticipants);
        }
      });
  }, []);

  useEffect(() => {
    console.log("useEffect on going");
    if (!idGroup) {
      return console.log("erreur:", idGroup);
    }
    fetch(`http://localhost:3000/groups/findOneGroup/${idGroup}`)
      .then((response) => response.json())
      .then((data) => {
        setOneGroupData(data.group);
        console.log(data.group);
      });
  }, []);

  const handleChange = (e, value) => {
    setAddParticipant(value);
  };

  return (
    <Modal open={open} onClose={handleToggleModal}>
      <Box sx={styleModal}>
        <Typography>
          Modifier votre groupe
        </Typography>
        <Box>
        <TextField
            type="text"
            label={`Actuel nom : ${oneGroupData.title}`}
            name="nom de groupe"
            style={{width: 300}}
            // value={form.role}
            // onChange={handleChange}
          />
  <Autocomplete
            disablePortal
            options={filtredData}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Rechercher les participants" />
            )}
            value={addParticipant}
            onChange={handleChange}
          />
             <Box>
            <Button>
              Retour
            </Button>
            <Button>
              Enregistrer
            </Button>

        </Box>
        </Box>
        

     
      </Box>
    </Modal>
  );
}

// MODAL STYLE
//Composant MUI adapté au projet
const styleModal = {
  display: 'flex',
  flexDirection : 'column',
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  p: 10,
};
// const styleContainer = {
//   display: "grid",
//   gridTemplateColumns: "repeat(2, 1fr)",
// };

export default Modify;
