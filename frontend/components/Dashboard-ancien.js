import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import styles from '../styles/Dashboard.module.css';
//import Image from "next/image";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';       <FontAwesomeIcon icon={faBookmark} />
//import { faBookmark, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 

function Dashboard() {
  return (
    <div className={styles.container}>
      <Header/>
      <Main/>
      <Footer/>
  </div>
  );
}

export default Dashboard;
