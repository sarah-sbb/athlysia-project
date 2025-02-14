import styles from '../../styles/Events.module.css';
import AddEvent from "./AddEvent";
import AddParticipant from "./AddParticipant";
import AddCom from "./AddCom";

function EventPage () {
  return (
    <div className={styles.formContainer}>
              <div className={styles.formButton}>
                <button>Enregistrer</button>
                <button>Générer les autorisations</button>
              </div>
          <div class={styles.formInfos}>
            <div class={styles.formAddInfos}>
              <AddEvent />
            </div>
            <div class={styles.formAddParticipants}>
              <AddParticipant />
            </div>
          </div>
          <div class={styles.formAddCom}>
            <AddCom />
          </div>
    </div>

  );
}

export default EventPage;
