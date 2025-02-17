import styles from "../styles/adminProfile.module.css";
import Image from "next/image";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';       <FontAwesomeIcon icon={faBookmark} />
//import { faBookmark, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  Box,
  Button,
  TextField,
  // Typography,
  // Select,
  // InputLabel,
  // MenuItem,
  // FormControl,
} from "@mui/material";

function Content() {
  const token = useSelector((state) => state.admin.value.token);

  // Modal modifications des infos admin
  const [open, setOpen] = useState(false);

  // Infos admin
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [role, setRole] = useState("");
  const [picture, setPicture] = useState("");

  // Infos groupes gérés par l'admin
  const [groupsData, setGroupsData] = useState([]);
  let groupsList = [];

  // Formulaire pour les modifications des infos admins
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

  const handleModify = () => {
    console.log(token)
    setOpen(!open);
    fetch("http://localhost:3000/admins/updateByToken", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...form, token}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
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
            label="Position"
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
            type="text"
            label="URL photo"
            name="pictureUrl"
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
          <Button sx={buttonSignUpStyle} onClick={handleModify}>
            Valider
          </Button>
        </Box>
      </Box>
    </Modal>
  );

  useEffect(() => {
    // Récupération des infos relatives à l'admin lui-même
    fetch("http://localhost:3000/admins/findByToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.data.firstName);
        setLastName(data.data.lastName);
        setPosition(data.data.position);
        setRole(data.data.role);
        setPicture(data.data.pictureUrl);
      });

    // Récupération des infos relatives aux groupes gérés par l'admin
    fetch("http://localhost:3000/groups/findAllGroupsByAdminToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setGroupsData(
            data.data.map((element) => ({
              title: element.title,
              nbParticipants: element.participantIds.length,
            }))
          );
        }
      });
  }, []);

  // Transformation des données brutes des groupes pour affichage
  groupsList = groupsData.map((e) => {
    return (
      <li className={styles.list}>
        {e.title} - {e.nbParticipants} participant(s)
      </li>
    );
  });

  return (
    <div className={styles.mainContent}>
      {picture ? (
        <Image
          src={picture}
          alt="Ma photo de profil"
          width={100}
          height={100}
        />
      ) : (
        <Image
          src="/profil.webp"
          alt="Ma photo de profil"
          width={100}
          height={100}
        />
      )}
      <ul>
        <li className={styles.list}>
          <strong>First name</strong> {firstName}
        </li>
        <li className={styles.list}>
          <strong>Last name</strong> {lastName}
        </li>
        <li className={styles.list}>
          <strong>Position</strong> {position}
        </li>
        <li className={styles.list}>
          <strong>Role</strong> {role}
        </li>
      </ul>
      <a onClick={handleToggleModal}>Modifier mon profil</a>
      {modificationPopin}
      <h3>Mes stats</h3>
      <h3>Mes groupes</h3>
      <ul>
        {groupsData.length === 0 ? <span>Aucun groupe</span> : groupsList}
      </ul>
      <h3>Mes sorties</h3>
      <h3>Mes autorisations</h3>
    </div>
  );
}

// MODAL STYLE
//Composant MUI adapté au projet
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

const styleButtonOpenModal = {
  bgcolor: "white",
  fontSize: "0.75rem",
  color: "#031EAD",
};

const styleHeader = {
  textAlign: "center",
  pb: 5,
  fontSize: "1.1rem",
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

const styleErrorSignUp = {
  display: "flex",
  justifyContent: "center",
  color: "red",
};

const styleSuccesSignUp = {
  display: "flex",
  justifyContent: "center",
  color: "green",
};

export default Content;
