import styles from '../../styles/Events.module.css';
import { Input } from '../modules/Input';


function AddEvent() {
  return (
      <form>      
        <div>
          <Input 
          label="Nom de votre évènement" 
          size="medium" 
          type="text" />
        </div>

        <div className={styles.formGroup}>
          <label>Choix du groupe</label>
          <select className={styles.formSelect}>
            <option value="">Sélectionner un groupe</option>
            <option value="groupe1">Groupe 1</option>
            <option value="groupe2">Groupe 2</option>
            <option value="groupe3">Groupe 3</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Ajouter un participant</label>
          <select className={styles.formSelect}>
            <option value="">Sélectionner un participant</option>
            <option value="participant1">Participant 1</option>
            <option value="participant2">Participant 2</option>
            <option value="participant3">Participant 3</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Date de début</label>
          <input type="date" className={styles.formControl} />
        </div>
        
        <div className={styles.formGroup}>
          <label>Date de fin</label>
          <input type="date" className={styles.formControl} />
        </div>

        <div>
          <Input 
          label="Lieu de votre évènement" 
          size="medium" 
          type="text" />
        </div>
      </form>
  );
}

export default AddEvent;