import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import styles from '../styles/Dashboard.module.css';

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
