import styles from "../../styles/dashboard.module.css";
import Layout from "../../components/layout/Layout";
import QuickActions from "../../components/dashboard/QuickActions";
import AllEvents from "../../components/dashboard/AllEvents";
import AllGroups from "../../components/dashboard/AllGroups";
import MyAccountWidget from "../../components/dashboard/MyAccount";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Index() {

  const etablissementId = useSelector((state) => state.admin.value.etablissement);
  const [etablissement, setEtablissement] = useState(null);

useEffect(() => {
  fetch(`http://localhost:3000/etablissements/find/${etablissementId}`)
  .then(response => response.json())
  .then(data => {
    if (data) {
      setEtablissement(data.data.name)
    }
  })
},[]);

  return (
    <Layout>
      <QuickActions />
      <div className={styles.myEventsContainer}>
        <h2>Evénements | <span style={{color: "var(--warning-color)"}}>{etablissement}</span></h2>
        <AllEvents />
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.myGroupsContainer}>
          <h2>Groupes | <span style={{color: "var(--warning-color)"}}>{etablissement}</span></h2>
          <AllGroups />
        </div>
        <div className={styles.myAccountContainer}>
          <MyAccountWidget />
        </div>
      </div>
    </Layout>
  );
}

export default Index;
