import styles from '../styles/Footer.module.css';


function Footer() {
  return (
    <div className={styles.footer}>
        <div className={styles.footerLogout}>logout</div>
        <div className={styles.footerContent}>footer content</div>
    </div>  
  );
}

export default Footer;