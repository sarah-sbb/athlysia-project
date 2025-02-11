import React, { useState } from 'react';
import styles from '../styles/Participants.module.css';
import Table from './Table';

function Participants() {
  const [participants, setParticipants] = useState([
    { name: 'Albert' },
    { name: 'Einstein' },
    { name: 'Homer' },
    { name: 'Marge' },
    { name: 'Bart' },
    { name: 'Malcolm' }
  ]);

  const addParticipant = () => {
    
  };

  const editParticipant = (index) => {
    
  };

  const deleteParticipant = (index) => {
    
  };

  const searchParticipant = (event) => {
   
  };

  return (
    <div className={styles.centered}>
      <header className={styles.headerContainer}>
        Participant
      </header>
      <Table
        participants={participants}
        addParticipant={addParticipant}
        editParticipant={editParticipant}
        deleteParticipant={deleteParticipant}
        searchParticipant={searchParticipant}
      />
    </div>
  );
}

export default Participants;