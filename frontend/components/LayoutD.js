import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';
import styles from '../styles/LayoutD.module.css'

function LayoutD({ children }) {
  return (
    <div className={styles.container}>
        header
    <main>
        {children}
    </main>
  <Footer/>
    </div>
  );
}

export default LayoutD;