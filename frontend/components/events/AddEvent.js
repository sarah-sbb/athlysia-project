import styles from '../../styles/Events.module.css';

function AddEvent() {
  return (
    <form className={styles.form}>
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

export default AddEvent;