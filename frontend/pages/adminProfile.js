import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import styles from '../styles/adminProfile.module.css';

function adminProfile() {
    return (
        <div className={styles.container}>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    )
};

export default adminProfile;