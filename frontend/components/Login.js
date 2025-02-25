import styles from "../styles/Login.module.css";
import { useState } from "react";
import Image from "next/image";
import SignUp from "./SignUp";
import { useRouter } from "next/router";
import { login } from "../reducers/admin";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  //A. Redux
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.value);

  //B. Route
  const router = useRouter();

  //C. State
  const [open, setOpen] = useState(false);
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);

  //D. Logique
  const handleToggleModal = () => {
    setOpen(!open);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignIn((prevSignIn) => ({
      ...prevSignIn,
      [name]: value,
    }));
  };

  // fonction pour vérifier le schéma de l'adresse mail
  const isValidEmail = (mail) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(mail);
  };

  const handleConnection = () => {
    // Vérification des champs + mail côté front pour ne pas requêter inutilisement le backend (si le temps le permet utiliser une libraire comme validator js)

    if (!signIn.password || !signIn.email) {
      setIsError(true);
      setErrorMsg("Tous les champs sont requis");
      return;
    }

    // Vérification de l'email avec la regex
    if (!isValidEmail(signIn.email)) {
      setIsError(true);
      setErrorMsg("L'email est invalide.");
      return;
    }

    fetch("http://localhost:3000/admins/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signIn.email, password: signIn.password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          router.push("/ctp-admin");
          console.log("connecté : ", data.infoAdmin);
          console.log(data.etablissement);
          dispatch(
            login({
              token: data.token,
              etablissement: data.etablissement,
              role: data.role,
              infoAdmin: data.infoAdmin,
            })
          );
        } else {
          console.log(data.result, "erreur : ", data.message);
          setIsError(true);
          setErrorMsg(data.message);
        }
      });
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.headerContainer}>
        <div className={styles.logo}>
          <Image
            src="/iconeWhite.webp"
            alt="logo Athlysia"
            width={75}
            height={52}
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
            <div className={styles.logoBlueContainer}>
              <Image
                src="/iconeOff.webp"
                alt="logo Athlysia"
                width={90}
                height={70}
              />
            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.containerLogin}>
            <input
              type="text"
              placeholder="Email"
              className={styles.input}
              value={signIn.email}
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              className={styles.input}
              value={signIn.password}
              name="password"
              onChange={handleChange}
            />
            {isError && errorMsg && (
              <p className={styles.errorConnection}>{errorMsg} </p>
            )}
            <button className={styles.buttonSignIn} onClick={handleConnection}>
              Se connecter
            </button>

            <button className={styles.buttonSignUp} onClick={handleToggleModal}>
              S'inscrire
            </button>
            <SignUp open={open} handleToggleModal={handleToggleModal} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
