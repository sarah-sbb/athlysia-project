import styles from '../../styles/Groups.module.css';

import { buttonStyles } from '../modules/Button';

import AddGroup from "./AddGroup";

function GroupPage () {
  return (
    <div className={styles.groupContainer}>
            <div className={styles.groupHeader}>
              <p>Compléter les informations du groupe</p>
              <div className={styles.formButton}>
                <button className={buttonStyles(
                  { color: 'primary' })}>
                  Enregistrer
                </button>
              </div>
            </div>
            
          <div className={styles.groupInfos}>
              <AddGroup />
              <div>Box de participant</div>
          </div>
    </div>

  );
}

export default GroupPage;
