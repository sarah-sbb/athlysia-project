import styles from '../../styles/Participants.module.css';
import LargeButtonRed from '../smallComponents/LargeButtonRed';
import LargeButtonWhite from '../smallComponents/LargeButtonWhite';
import Input from '../smallComponents/Input';

function Add() {
  return (
    <div>
<div>Ajout d'un participant</div>
<LargeButtonRed title="title1"/>
<LargeButtonWhite title="title2"/>
<Input placeholder="my ass"/>
    </div>

  );
}

export default Add;
