import styles from "../../styles/dashboard.module.css";
import Layout from "../../components/layout/Layout";
import QuickActions from "../../components/dashboard/QuickActions";
// import MyLastEvents from "../../components/dashboard/MyLastEvents";
import AdminProfileGroups from "../../components/adminProfile/AdminProfileGroups";
import MyAccountWidget from "../../components/dashboard/MyAccount";
import AdminProfileEvents from "../../components/adminProfile/AdminProfileEvents";

function Index() {
  return (
    <Layout>
      <QuickActions />
      <div className={styles.myEventsContainer}>
        <h2>Mes événements</h2>
        <AdminProfileEvents />
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.myGroupsContainer}>
          <h2>Mes groupes</h2>
          <AdminProfileGroups />
        </div>
        <div className={styles.myAccountContainer}>
          <MyAccountWidget />
        </div>
      </div>
    </Layout>
  );
}

export default Index;
