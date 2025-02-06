import styles from '../styles/Dashboard.module.css';
import Image from "next/image";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';       <FontAwesomeIcon icon={faBookmark} />
//import { faBookmark, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 

function Dashboard() {
  return (
    <div classNameName={styles.container}>
    <div className={styles.header}>
      <div className={styles.headerLogo}>
        <Image src="/iconeWhite.webp" alt="logo Athlysia" width={75} height={52}/>
      </div>
      <div className={styles.headerTitle}>
        <h1>Titre de la page</h1>
      </div>
      <div className={styles.headerNav}>profil</div>
    </div>
    <div className={styles.main}>
      <div className={styles.mainNavbar}>Navbar</div>
      <div className={styles.mainContent}>contenu</div>
    </div>
    <div className={styles.footer}>
      <div className={styles.footerLogout}>logout</div>
      <div className={styles.footerContent}>footer content</div>
    </div>
  </div>

  
  );
}

export default Dashboard;
