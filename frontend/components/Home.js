import styles from "../styles/Home.module.css";
import Image from "next/image";



function Home() {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.headerContainer}>
        <div className={styles.logo}>
          <Image src="/Logo-white-text.svg" alt="logo Athlysia" width={300} height={50}/>
        </div>
      </header>
      <div className={styles.loginContainer}>
      <div className={styles.leftSection}>
      <div styles={styles.textContainer}>
      <p className={styles.textIntro}>Bienvenue sur CheckToPic, la plateforme de gestion de droit à l’image qui vous facilite la vie.<br/><br/>Depuis 2024, CheckToPic fluidifie le processus de signature pour droits à l’image dans le cadre scolaire pour les enseignants et les parents. <br/><br/> Pour accéder à votre compte, merci de rentrer votre nom d’utilisateur et mot de passe, puis de confirmer avec “Log in”. <br/><br/> Si vous souhaitez rejoindre notre plateforme et créer un compte, merci de contacter un de vos administrateurs.</p>
      <Image src="/logo-bleu.svg" alt="logo Athlysia" width={700} height={50}/>
      </div>
  
      </div>
      <div className={styles.rightSection}>
      <div className={styles.containerLogin}>
        <input type="text" placeholder="Email" className={styles.input}></input>
        <input type="text" placeholder="Mot de passe" className={styles.input}></input>
      <button className={styles.buttonConnected}>
      Se connecter
      </button>
      <button className={styles.buttonRegister}>
      S'inscrire
      </button>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Home;
