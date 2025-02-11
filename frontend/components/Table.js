import React, { useEffect } from 'react';
import styles from '../styles/Participants.module.css';

export default function Table({ participants, addParticipant, editParticipant, deleteParticipant, searchParticipant }) {
  useEffect(() => {
    loadParticipants();
  }, [participants]);

  const loadParticipants = () => {
    const tableBody = document.getElementById('participantTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    participants.forEach((participant, index) => {
      const row = tableBody.insertRow();
      const nameCell = row.insertCell(0); //ce tableau contient juste le name, donc nameCell index 0
      const actionCell = row.insertCell(1); //ce tableau contient deux boutons, donc actionCell index 0 et 1

      nameCell.textContent = participant.name; //cellules qui contient les boutons pour intéragir
      actionCell.innerHTML = `
        <button onclick="editParticipant(${index})">Modifier</button> 
        <button onclick="deleteParticipant(${index})">Supprimer</button>
      `;
    });
  };

  //overflow hidden : pour scroll dans un tableau sur css
  //fonctions à définir

  return (
    <div className={styles.centered}>
      <button onClick={addParticipant}>Ajouter un participant</button>
      <input type="text" id="searchInput" placeholder="Rechercher un élève" onKeyUp={searchParticipant} />
      <table id="participantTable">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => (
            <tr key={index}>
              <td>{participant.name}</td>
              <td>
                <button onClick={() => editParticipant(index)}>Modifier</button>
                <button onClick={() => deleteParticipant(index)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
