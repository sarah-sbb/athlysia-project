import styles from '../../styles/Events.module.css';

function Add() {
  return (
    <form className={styles.form}>
      <div className={styles.formButtons}>
        <button>Enregistrer</button>
        <button>Générer les autorisations</button>
      </div>
      <div className={styles.formExample}>
        <label>Enter your name: </label>
      </div>
      <div className={styles.formExample}>
        <label>Enter your email: </label>
        <input/>
      </div>
      <div className={styles.formExample}>
      </div>
    </form>
  );
}

export default Add;