import styles from '../styles/Navbar.module.css';
//import Image from "next/image";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';       <FontAwesomeIcon icon={faBookmark} />
//import { faBookmark, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 

function Navbar() {
  return (
    <nav classNameName={styles.mainNavbar}>
      <div className={styles.accordionContainer}>
          <div className={styles.accordionItem}>
              <div className={styles.accordionHeader}>
                  Tableau de bord
              </div>
          </div>
          <div className={styles.accordionItem}>
              <div className={styles.accordionHeader}>
                  Groupes
              </div>
              <div className={styles.accordionContent}>
                  <a href="/" className={styles.subItem}>Tous les groupes</a>
                  <a href="/" className={styles.subItem}>Ajouter un groupe</a>
              </div>
          </div>
      
          <div className={styles.accordionItem}>
              <div className={styles.accordionHeader}>Participants
              </div>
              <div className={styles.accordionContent}>
                  <a href="/" className={styles.subItem}>Tous les participants</a>
                  <a href="/" className={styles.subItem}>Ajouter un participant</a>
              </div>
          </div>
      
          <div className={styles.accordionItem}>
              <div className={styles.accordionHeader}>
                  Événements
              </div>
              <div className={styles.accordionContent}>
                  <a href="/" className={styles.subItem}>Tous les événements</a>
                  <a href="/" className={styles.subItem}>Créer un événement</a>
              </div>
          </div>
        </div>
    </nav>
  );
}

export default Navbar;