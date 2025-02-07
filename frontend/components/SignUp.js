import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";



function SignUp({ open, handleToggleModal }) {
    
  
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    function: "",
    role: "",
    email: "",
    establishment: "",
    password: "",
  });



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
        establishment: form.establishment,
        password: form.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("user créé");
        } else {
          console.log(data.result, "erreur : ",  data.message);
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
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
          <TextField type="text" label="Rôle" name="role" value={form.role}   onChange={handleChange} />
          <TextField
            type="text"
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            type="text"
            label="Établissement"
            name="establishment"
            value={form.establishment}
            onChange={handleChange}
          />
          <TextField
            type="password"
            label="Mot de passe"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </Box>

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
