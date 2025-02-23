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
        <h1>Mes événements</h1>
        <AdminProfileEvents />
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.myGroupsContainer}>
          <h1>Mes groupes</h1>
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
