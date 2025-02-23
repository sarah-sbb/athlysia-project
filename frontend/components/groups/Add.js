import styles from '../../styles/Groups.module.css';
import {useState } from 'react';
import { buttonStyles } from '../modules/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';       
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AddGroup from "./AddGroup";

function Add () {

  const [participantInGroup, setParticipantInGroup] = useState([])
  const [titleGroup, setTitleGroup] = useState("")

// supprimer le participant du groupe en fonction de son ID
const handleRemoveParticipant= (id) =>{
setParticipantInGroup(participantInGroup.filter((e)=>
  e.id!==id
))
}

const handleChange= () => {


}
  return (
    <div className={styles.groupContainer}>
            <div className={styles.groupHeader}>
              <p>Compléter les informations du groupe</p>
              <div className={styles.formButton}>
                <button onChange={handleChange}
                className={buttonStyles(
                  { color: 'primary' })}>
                  Enregistrer
                </button>
               
              </div>
            </div>
            
          <div className={styles.groupInfos}>
              <AddGroup participantInGroup={participantInGroup}
               setParticipantInGroup={setParticipantInGroup} />
              <div>
                <h3>Box de participant</h3>
              
                {participantInGroup.map((participant, index) => (
            <p key={index}>{participant.label}  <FontAwesomeIcon icon={faXmark} onClick={()=>handleRemoveParticipant(participant.id)} />
</p>
          ))}
                </div>
          </div>
    </div>

  );
}

export default Add;
