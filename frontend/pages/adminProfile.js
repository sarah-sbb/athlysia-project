import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ContentAdminProfile from "../components/ContentAdminProfile";
import styles from "../styles/adminProfile.module.css";

function adminProfile() {
  return (
    <div>
      <Header />
      <div className={styles.main}>
        <Navbar />
        <ContentAdminProfile />
      </div>
      <Footer />
    </div>
  );
}

export default adminProfile;
