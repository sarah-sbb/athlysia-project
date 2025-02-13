import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
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
