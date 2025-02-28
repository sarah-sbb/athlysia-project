import styles from '../../styles/Layout.module.css';

import { useRouter } from "next/router";
import { useState } from "react";

import { getPageTitle } from "../../data/pageTitle";

import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

function Dashboard({children}) {
  const router = useRouter(); // Utilisation du router pour récupérer le pathname
  const [title, setTitle] = useState(getPageTitle(router.pathname)); // Création de l'état pour le titre
 
  return (
    <div className={styles.container}>
      {/* Passe le titre dynamique au composant Header */}
      <Header title={title}/>
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