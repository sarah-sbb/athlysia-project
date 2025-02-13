import styles from '../../styles/Footer.module.css';
//import Image from "next/image";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';       <FontAwesomeIcon icon={faBookmark} />
//import { faBookmark, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 

function Footer() {
  return (
    <div className={styles.footer}>
        <div className={styles.footerLogout}>logout</div>
        <div className={styles.footerContent}>footer content</div>
    </div>  
  );
}

export default Footer;