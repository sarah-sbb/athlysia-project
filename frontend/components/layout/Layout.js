import { useRouter } from "next/router";
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import { getPageTitle } from "../../data/pageTitle";
import styles from '../../styles/Layout.module.css';

function Dashboard({children}) {
  const router = useRouter(); // Utilisation du router pour récupérer le pathname
  const title = getPageTitle(router.pathname); // Récupération du titre dynamique en fonction du chemin
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