import styles from '../styles/Participants.module.css';
import DataTable from './Table'; 

function Participants() {
  return (
    <div className={styles.centered}>
      <header className={styles.headerContainer}>
        Participant
      </header>
      <div className={styles.tableContainer}>
        <DataTable /> {}
      </div>
    </div>
  );
}

export default Participants;
