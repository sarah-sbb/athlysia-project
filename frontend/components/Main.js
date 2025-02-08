import Navbar from './Navbar';
import Content from './Content';
import styles from '../styles/Main.module.css';
//import Image from "next/image";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';       <FontAwesomeIcon icon={faBookmark} />
//import { faBookmark, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 

function Main() {
  return (
    <div className={styles.main}>      
        <Navbar/>
        <Content/>  
    </div>  
  );
}

export default Main;