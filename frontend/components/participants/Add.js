import styles from '../../styles/Participants.module.css';
import { buttonStyles } from '../modules/Button';
import AddParticipant from "./AddParticipant";

function ParticipantPage () {
  return (
    <div className={styles.partContainer}>
            <div className={styles.partHeader}>
              <p>Compléter les informations du participant</p>
              <div className={styles.formButton}>
                <button className={buttonStyles(
                  { color: 'primary' })}>
                  Enregistrer
                </button>
              </div>
            </div>
          <div>
              <AddParticipant />
          </div>
    </div>

  );
}

export default ParticipantPage;
