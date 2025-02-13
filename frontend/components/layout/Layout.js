import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

import styles from '../../styles/Layout.module.css';
//import Image from "next/image";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';       <FontAwesomeIcon icon={faBookmark} />
//import { faBookmark, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 

function Dashboard({children}) {
  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.main}>      
        <Navbar/>
        <div className={styles.mainContent}>
            {children}
        </div> 
        </div> 
      <Footer/>
  </div>
  );
}

export default Dashboard;