import { Button } from "@mui/material";
import EditCalendar from "@mui/icons-material/EditCalendar";
import GroupAdd from "@mui/icons-material/GroupAdd";
import Link from "next/link";

function QuickActions() {
  return (
    <div>
      <h2>Actions rapides</h2>
      <div>
        <Button
          variant="outlined"
          sx={buttonEvent}
          startIcon={<EditCalendar />}
          component={Link}
          href="/ctp-admin/events/add"
        >
          Créer un événement
        </Button>
        <Button
          variant="contained"
          sx={buttonGroup}
          startIcon={<GroupAdd />}
          component={Link}
          href="/ctp-admin/groups/add"
        >
          Créer un groupe
        </Button>
      </div>
    </div>
  );
}

const buttonEvent = {
  color: "#031EAD",
  fontSize: "0.90rem",
  width: 300,
  marginRight: "20px",
  borderColor: "#031EAD",
};
const buttonGroup = {
  bgcolor: "#031EAD",
  color: "white !important",
  fontSize: "0.90rem",
  width: 300,
};

export default QuickActions;
