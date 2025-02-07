import { Modal, Box, Button, TextField, Typography } from "@mui/material";

function SignUp ({open, handleToggleModal }) {
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
    gap:2,
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
            Pour s'inscrire, veuillez remplir les champs suivants :
          </Typography>

          {/* Formulaire */}
          <Box sx={styleContainer}>
            <TextField label="Prénom"  />
            <TextField label="Nom"  />
            <TextField label="Fonction"  />
            <TextField label="Rôle"  />
            <TextField label="Email"  />
            <TextField label="Établissement"  />
          </Box>

          {/* Footer avec les deux boutons */}
          <Box sx={styleFooter}>
            <Button sx={buttonCloseStyle} onClick={handleToggleModal}>
              Fermer
            </Button>
            <Button sx={buttonSignUpStyle}>S'inscrire</Button>
          </Box>
        </Box>
      </Modal>









    )

}

export default SignUp