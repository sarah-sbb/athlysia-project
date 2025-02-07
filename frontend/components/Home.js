import styles from "../styles/Home.module.css";
import { useState } from "react";
import Image from "next/image";
import SignUp from "./SignUp";
import Link from 'next/link';
import { useRouter } from 'next/router';



function Home() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleToggleModal = () => {
    console.log("handleToggleModal appelé !")

    setOpen(!open);
  };
  const [signIn, setSignIn] = useState ({
    email: "",
    password: "",

  })
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignIn((prevSignIn) => ({
      ...prevSignIn,
      [name]: value,
    }));
  };
  
	const handleConnection = () => {
		fetch('http://localhost:3000/admins/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: signIn.email, password: signIn.password }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
          router.push("/dashboard");
          console.log("connecté : ", data.result)
				} else {
          console.log(data.result, "erreur : ",  data.message);
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
            ></input>
            <input
              type="password"
              placeholder="Mot de passe"
              className={styles.input}
              value={signIn.password}
              name="password"
              onChange={handleChange}
            ></input>
            <button className={styles.buttonSignIn} onClick={handleConnection}>Se connecter</button>
            <button className={styles.buttonSignUp} onClick={handleToggleModal}>S'inscrire</button>
           <SignUp  open={open} handleToggleModal={handleToggleModal}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
