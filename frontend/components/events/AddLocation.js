import styles from "../../styles/Events.module.css";

import { Input } from '../modules/Input';

function AddLocation() {

  return (
    <form className={styles.form}>
      {/* Champ pour entrer le lieu de l’événement */}
      <Input
        label="Lieu de votre évènement"
        name="location"
        value={form?.location || ""}
        onChange={handleFormChange}
      />
    </form>
  );
}

export default AddLocation;