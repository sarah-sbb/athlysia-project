import styles from '../../styles/Participants.module.css';
import { Input } from '../modules/Input';
import { Dropdown } from '../modules/Dropdown';

function AddEvent() {
  return (
    <div className={styles.formAddParticipant}>
      <form className={styles.form}>      
          <div className={styles.partGrid}>
            <Input label="Prénom du participant" />
            <Input label="Nom du participant" />
          </div>

          <Dropdown label="Choix du groupe">
            <li>Sélectionner un groupe</li>
            <li>Groupe 1</li>
            <li>Groupe 2</li>
            <li>Groupe 3</li>
          </Dropdown>

          <h2 className={styles.partTitle}>Premier représentant légal</h2>

          <div className={styles.partGrid}>
            <Input label="Prénom" />
            <Input label="Nom" />
          </div>

          <div className={styles.partGrid}>
            <Input label="Email" />
            <Input label="Téléphone" />
          </div>

          <h2 className={styles.partTitle}>Deuxième représentant légale</h2>

          <div className={styles.partGrid}>
            <Input label="Prénom" />
            <Input label="Nom" />
          </div>

          <div className={styles.partGrid}>
            <Input label="Email" />
            <Input label="Téléphone" />
          </div>
      </form>
      <div className={styles.partIdenty}>
        Photo d'idendité
      </div>
    </div>
  );
}

export default AddEvent;