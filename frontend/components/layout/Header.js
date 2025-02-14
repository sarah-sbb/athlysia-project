import styles from '../../styles/Header.module.css';
import Image from "next/image";
import Link from 'next/Link';

function Header({ title }) {
  return (
    <div className={styles.header}>
      <div className={styles.headerLogo}>
        <Image src="/iconeWhite.webp" alt="logo Athlysia" width={75} height={52}/>
      </div>
      <div className={styles.headerTitle}>
        <h1>{title}</h1>
      </div>
      <div className={styles.headerNav}><Link href="/adminProfile"><a className={styles.link}>Mon profil</a></Link></div>
    </div>
  );
}

export default Header;