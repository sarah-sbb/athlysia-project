import styles from '../../styles/Participants.module.css';
import { buttonStyles } from '../modules/Button';
import Input from '../smallComponents/Input';

function Add() {
  return (
    <div className={styles.participantContainer}>
<div>Ajout d'un participant</div>

<div className={styles.partButton}>
  <button className={buttonStyles({ color: 'primary' })}>Title 1</button>
  <button className={buttonStyles({ color: 'secondary' })}>Title 2</button>
</div>

<Input placeholder="my ass"/>
    </div>

  );
}

export default Add;
