import styles from '../../styles/Events.module.css';
import { Input } from '../modules/Input';
import { Dropdown } from '../modules/Dropdown';
import { DateInput } from '../modules/DateInput';

function AddEvent() {
  return (
      <form className={styles.form}>      
          <Input label="Nom de votre évènement" />

          <Dropdown label="Choix du groupe">
            <li>Sélectionner un groupe</li>
            <li>Groupe 1</li>
            <li>Groupe 2</li>
            <li>Groupe 3</li>
          </Dropdown>

          <Dropdown label="Ajouter un participant">
            <li>Sélectionner un groupe</li>
            <li>Groupe 1</li>
            <li>Groupe 2</li>
            <li>Groupe 3</li>
          </Dropdown>

          <DateInput />
        
          <DateInput />

          <Input label="Lieu de votre évènement" />
      </form>
  );
}

export default AddEvent;