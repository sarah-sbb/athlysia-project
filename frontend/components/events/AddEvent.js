import styles from '../../styles/Events.module.css';

function AddEvent() {
  return (
    <form>
      <h2>Votre évènement</h2>
      <div className={styles.formGroup}>
        <label>Nom de l'évènement</label>
        <input type="text" className={styles.formControl} />
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
      <div className={styles.formGroup}>
        <label>Lieu de l'évènement</label>
        <input type="text" className={styles.formControl} />
      </div>
    </form>
  );
}

export default AddEvent;