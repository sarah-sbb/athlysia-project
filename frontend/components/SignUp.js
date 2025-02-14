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
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { login } from "../reducers/admin";
import { useDispatch, useSelector } from "react-redux";

function SignUp({ open, handleToggleModal }) {

  

  //redux
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.value);

  //changement de route
  const router = useRouter();

  //state
  const [etablissementList, setEtablissementList] = useState([]);
  const [isCorrect, setIsCorrect] = useState(true);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    function: "",
    role: "",
    email: "",
    etablissement: "",
    password: "",
  });

  //logique

  const etablissementListToDisplay = [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetch("http://localhost:3000/etablissements/allEtablissements")
      .then((response) => response.json())
      .then((data) => {
        setEtablissementList(data.data.map((e) => e.name));
      });
  }, []);

  for (let element of etablissementList) {
    etablissementListToDisplay.push(
      <MenuItem value={element}>{element}</MenuItem>
    );
  }

  const handleRegister = () => {
    fetch("http://localhost:3000/admins/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        function: form.function,
        role: form.role,
        email: form.email,
        etablissement: form.etablissement,
        password: form.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("user créé");
          dispatch(login({token : data.token, etablissement : data.etablissement, role :data.role, infoAdmin : data.infoAdmin}))
          router.push("/ctp-admin");
        } else {
          console.log(data.result, "erreur : ", data.message);
          setIsCorrect(!isCorrect);
        }
      });
  };

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

  return (
    // props sx pour styliser la modal directment dans le composant Mui

    <Modal open={open} onClose={handleToggleModal}>
      <Box sx={styleModal}>
        {/* Header */}
        <Typography sx={styleHeader}>
          Pour inscrire un nouvel utilisateur, veuillez-remplir les champs
          suivants :
        </Typography>

        {/* Formulaire */}
        <Box sx={styleContainer}>
          <TextField
            type="text"
            label="Prénom"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
          <TextField
            type="text"
            label="Nom"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
          <TextField
            type="text"
            label="Fonction"
            name="function"
            value={form.function}
            onChange={handleChange}
          />
          <TextField
            type="text"
            label="Rôle"
            name="role"
            value={form.role}
            onChange={handleChange}
          />
          <TextField
            type="text"
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel id="etablissement">Etablissement</InputLabel>
            <Select
              labelId="etablissement"
              id="etablissement"
              name="etablissement"
              value={form.etablissement}
              label="etablissement"
              onChange={handleChange}
            >
              {etablissementListToDisplay}
            </Select>
          </FormControl>
          {/* <TextField // A supprimer une fois que le menu déroulant fonctionne
            type="text"
            label="Établissement"
            name="etablissement"
            value={form.establishment}
            onChange={handleChange}
          /> */}
          <TextField
            type="password"
            label="Mot de passe"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </Box>

        {isCorrect ? null : (
          <Typography sx={styleErrorSignUp}>
            Veuillez - remplir tous les champs
          </Typography>
        )}

        {/* Footer avec les deux boutons */}

        <Box sx={styleFooter}>
          <Button sx={buttonCloseStyle} onClick={handleToggleModal}>
            Fermer
          </Button>
          <Button sx={buttonSignUpStyle} onClick={handleRegister}>
            S'inscrire
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default SignUp;
