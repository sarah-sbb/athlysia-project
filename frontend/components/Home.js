import styles from "../styles/Home.module.css";
import Image from "next/image";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

function Home() {
  const [open, setOpen] = useState(false);

  const handleToggleModal = () => {
    setOpen(!open);
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
    <div className={styles.homeContainer}>
      <header className={styles.headerContainer}>
        <div className={styles.logo}>
          <Image
            src="/Logo-white-text.svg"
            alt="logo Athlysia"
            width={300}
            height={50}
          />
        </div>
      </header>
      <div className={styles.loginContainer}>
        <div className={styles.leftSection}>
          <div className={styles.textContainer}>
            <p className={styles.textIntro}>
              Bienvenue sur CheckToPic, la plateforme de gestion de droit à
              l’image qui vous facilite la vie.
              <br />
              <br />
              Depuis 2024, CheckToPic fluidifie le processus de signature pour
              droits à l’image dans le cadre scolaire pour les enseignants et
              les parents. <br />
              <br /> Pour accéder à votre compte, merci de rentrer votre email
              et mot de passe, puis de confirmer avec “Se connecter”. <br />
              <br /> Si vous souhaitez rejoindre notre plateforme et créer un
              compte, merci de contacter un de vos administrateurs.
            </p>
            <Image
              src="/logo-bleu.svg"
              alt="logo Athlysia"
              width={700}
              height={50}
            />
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.containerLogin}>
            <input
              type="text"
              placeholder="Email"
              className={styles.input}
            ></input>
            <input
              type="text"
              placeholder="Mot de passe"
              className={styles.input}
            ></input>
            <button className={styles.buttonConnected}>Se connecter</button>

            {/* Le prop sx permet d'ajouter directement du style en JSX sans passer par un fichier CSS externe.
      J'ai utilisé un module externe pour gagner du temps et je l'ai intégré directement au composant Home car il est affilié uniquenement à ce dernier */}
            <Button sx={styleButtonOpenModal} onClick={handleToggleModal}>
              S'inscrire
            </Button>
            {/* MODAL */}
            <Modal open={open} onClose={handleToggleModal}>
              <Box sx={styleModal}>
                {/* Header */}
                <Typography sx={styleHeader}>
                  Pour s'inscrire, veuillez remplir les champs suivants :
                </Typography>

                {/* Formulaire avec Grid */}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
