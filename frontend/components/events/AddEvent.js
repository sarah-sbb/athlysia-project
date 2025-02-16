import styles from '../../styles/Events.module.css';
import { Input } from '../modules/Input';
import { Dropdown } from '../modules/Dropdown';
import { DateInput } from '../modules/DateInput';

function AddEvent() {
  return (
      <form>      
        <div>
          <Input 
          label="Nom de votre évènement" 
          size="medium" 
          type="text" />
        </div>

        <div>
          <Dropdown label="Choix du groupe">
            <li>Sélectionner un groupe</li>
            <li>Groupe 1</li>
            <li>Groupe 2</li>
            <li>Groupe 3</li>
          </Dropdown>

        </div>

        <div className={styles.formGroup}>
        <Dropdown label="Ajouter un participant">
            <li>Sélectionner un groupe</li>
            <li>Groupe 1</li>
            <li>Groupe 2</li>
            <li>Groupe 3</li>
          </Dropdown>
        </div>

        <div>
          <DateInput />
        </div>
        
        <div>
          <DateInput />
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