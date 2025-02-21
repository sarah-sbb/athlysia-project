import styles from '../../styles/Events.module.css';
import { Input } from '../modules/Input';
import { Dropdown } from '../modules/Dropdown';
import { DateInput } from '../modules/DateInput';

const groupOptions = [
  { value: "group1", label: "Groupe 1" },
  { value: "group2", label: "Groupe 2" },
  { value: "group3", label: "Groupe 3" },
];

const handleDropdownChange = (e) => {
  console.log("Valeur sélectionnée :", e.target.value);
};

function AddEvent() {
  return (
      <form className={styles.form}>      
          <Input label="Nom de votre évènement" />

          <Dropdown
            label="Choix du groupe"
            options={groupOptions}
            onChange={handleDropdownChange}
          />

          <Dropdown label="Ajouter un participant">
          </Dropdown>

          <DateInput />
        
          <DateInput />

          <Input label="Lieu de votre évènement" />
      </form>
  );
}

export default AddEvent;