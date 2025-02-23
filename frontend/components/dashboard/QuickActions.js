import { Modal, Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditCalendar from '@mui/icons-material/EditCalendar';
import GroupAdd from '@mui/icons-material/GroupAdd';

function QuickActions() {
  return (
    <div>
      <h1>Actions rapide</h1>
      <div>
        <Button variant="outlined" sx={buttonEvent} startIcon={<EditCalendar />}>Créer un événement</Button>
        <Button variant="contained" sx={buttonGroup} startIcon={<GroupAdd />}>Créer un groupe</Button>
      </div>
    </div>
  );
}

const buttonEvent = {
  color: "#031EAD",
  fontSize: "0.90rem",
  width: 300,
  marginRight: "20px",
  borderColor: "#031EAD"
};
const buttonGroup = {
  bgcolor: "#031EAD",
  color: "white",
  fontSize: "0.90rem",
  width: 300,
};

export default QuickActions;
