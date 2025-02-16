import styles from '../../styles/Events.module.css';
import { buttonStyles } from '../modules/Button';

import AddEvent from "./AddEvent";
import AddParticipant from "./AddParticipant";
import AddCom from "./AddCom";

function EventPage () {
  return (
    <div className={styles.formContainer}>
              <div className={styles.formButton}>
              <button className={buttonStyles({ color: 'primary' })}>
                Enregistrer
              </button>
              <button className={buttonStyles({ color: 'secondary' })}>
                Générer les autorisations
              </button>
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
