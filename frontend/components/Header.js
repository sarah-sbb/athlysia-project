import styles from '../styles/Header.module.css';
import Image from "next/image";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';       <FontAwesomeIcon icon={faBookmark} />
//import { faBookmark, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerLogo}>
        <Image src="/iconeWhite.webp" alt="logo Athlysia" width={75} height={52}/>
      </div>
      <div className={styles.headerTitle}>
        <h1>Titre de la page</h1>
      </div>
      <div className={styles.headerNav}>profil</div>
    </div>
  );
}

export default Header;