import styles from "../../styles/adminProfile.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modify } from "../../reducers/admin";
import { Modal, Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import AdminProfileAuthorizations from "./AdminProfileAuthorizations";
import AdminProfileGroups from "./AdminProfileGroups";
import AdminProfileEvents from "./AdminProfileEvents";
import Avatar from "@mui/material/Avatar";

function AdminProfileMain() {
  // Initialisation redux
  const dispatch = useDispatch();
  const token = useSelector((state) => state.admin.value.token);
  const infoAdmin = useSelector((state) => state.admin.value.infoAdmin);

  // Modal modifications des infos admin
  const [open, setOpen] = useState(false);

  // Toggles pour les tabs
  const [showGroups, setShowGroups] = useState(true);
  const [showEvents, setShowEvents] = useState(false);
  const [showAuthorizations, setShowAuthorizations] = useState(false);

  // Formulaire pour les modifications des infos admins (sauf pictureUrl qui est gérée à part)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    position: "",
    role: "",
    email: "",
    etablissement: "",
    password: "",
  });

  const handleToggleModal = () => {
    setOpen(!open);
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleChangeImage = (e) => {
    // Mise à jour de la photo admin
    const formData = new FormData();
    formData.append("newAdminPicture", e.target.files[0]);

    fetch(`http://localhost:3000/admins/updatePicture/${token}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(modify(data.data)); // Mise à jour des infos reducer
      });
  };

  const handleSubmit = () => {
    setOpen(!open);
    fetch("http://localhost:3000/admins/updateByToken", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(modify(data.data)); // Mise à jour des infos reducer
        }
      });
  };

  const handleToggleTab = (tabName) => {
    if (tabName === "groups") {
      setShowGroups(!showGroups);
      setShowEvents(false);
      setShowAuthorizations(false);
    }
    if (tabName === "events") {
      setShowEvents(!showEvents);
      setShowGroups(false);
      setShowAuthorizations(false);
    }
    if (tabName === "authorizations") {
      setShowAuthorizations(!showAuthorizations);
      setShowGroups(false);
      setShowEvents(false);
    }
  };

  let modificationPopin = (
    <Modal open={open} onClose={handleToggleModal}>
      <Box sx={styleModal}>
        {/* Formulaire */}
        <Box sx={styleContainer}>
          <TextField
            type="text"
            label="Prénom"
            name="firstName"
            onChange={handleChangeForm}
          />
          <TextField
            type="text"
            label="Nom"
            name="lastName"
            onChange={handleChangeForm}
          />
          <TextField
            type="text"
            label="Fonction"
            name="position"
            onChange={handleChangeForm}
          />
          <TextField
            type="text"
            label="Email"
            name="email"
            onChange={handleChangeForm}
          />
          <TextField
            type="password"
            label="Mot de passe"
            name="password"
            onChange={handleChangeForm}
          />
        </Box>
        {/* Footer avec les deux boutons */}

        <Box sx={styleFooter}>
          <Button sx={buttonCloseStyle} onClick={handleToggleModal}>
            Fermer
          </Button>
          <Button sx={buttonSignUpStyle} onClick={handleSubmit}>
            Valider
          </Button>
        </Box>
      </Box>
    </Modal>
  );

  return (
    <div className={styles.mainContent}>
      <div className={styles.upperInfos}>
        <div className={styles.picContainer}>
          <Avatar src={infoAdmin.pictureUrl} sx={{ width: 180, height: 180, marginBottom: "20px" }} />
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            style={{ width: "200px" }}
            loadingIndicator="Loading…"
          >
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => handleChangeImage(event)}
              loadingIndicator="Loading..."
            />
            Modifier ma photo
          </Button>
        </div>
        <div className={styles.adminInfos}>
          <div className={styles.fullName}>
            {infoAdmin.firstName}{" "}
            <span className={styles.lastName}>{infoAdmin.lastName}</span>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <div>Fonction : {infoAdmin.position}</div>
            <div>Rôle : {infoAdmin.role}</div>
          </div>
          <Button variant="contained" onClick={handleToggleModal}>
            Modifier mon profil
          </Button>
          {modificationPopin}
        </div>
      </div>
      <div className={styles.tabBar}>
        <h3
          className={styles.tab}
          style={{ color: showGroups ? "" : "#757575" }}
          onClick={() => handleToggleTab("groups")}
        >
          Tous mes groupes
        </h3>
        <h3
          className={styles.tab}
          style={{ color: showEvents ? "" : "#757575" }}
          onClick={() => handleToggleTab("events")}
        >
          Tous mes événements
        </h3>
        <h3
          className={styles.tab}
          style={{ color: showAuthorizations ? "" : "#757575" }}
          onClick={() => handleToggleTab("authorizations")}
        >
          Toutes mes autorisations
        </h3>
      </div>
      {showGroups && <AdminProfileGroups />}
      {showEvents && <AdminProfileEvents />}
      {showAuthorizations && <AdminProfileAuthorizations />}
    </div>
  );
}
// MODAL STYLE
const styleModal = {
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: 2,
  p: 10,
};

const styleContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 2.5,
  padding: 1,
};

const styleFooter = {
  display: "flex",
  justifyContent: "center",
  pt: 5,
  gap: 2,
};

const buttonCloseStyle = {
  color: "#031EAD",
  fontSize: "0.90rem",
  width: 100,
};
const buttonSignUpStyle = {
  bgcolor: "#031EAD",
  color: "white",
  fontSize: "0.90rem",
  width: 100,
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default AdminProfileMain;
