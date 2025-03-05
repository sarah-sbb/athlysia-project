import styles from '../../styles/Events.module.css';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { buttonStyles } from '../modules/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import AddGroup from "./AddGroup";
import AddParticipant from "./AddParticipant";
import AddDate from "./AddDate";
//import AddLocation from "./AddLocation";
import AddCom from "./AddCom";

function EventPage() {
  const [participantInGroup, setParticipantInGroup] = useState([]);

    // supprimer le participant du groupe en fonction de son ID
    const handleRemoveParticipant = (id) => {
      setParticipantInGroup(participantInGroup.filter((e) => e.id !== id));
    };
    
  // État pour stocker les valeurs saisies dans le formulaire (+ groupe sélectionné)
    const [form, setForm] = useState({
      groupId: "", // L’ID du groupe sélectionné
      eventName: "", // Nom de l’événement
      location: "", // Lieu de l’événement
      participant: "", // Participant sélectionné
      startDate: "", // Valeur initiale pour la date de début
      endDate: "",   // Valeur initiale pour la date de fin
    });

  // Fonction pour mettre à jour les valeurs du formulaire
    const handleFormChange = (e) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,   // Met à jour la clé correspondante dans le state
      }));
    };
  
  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>

        <h2>Votre évènement</h2>
        <div className={styles.formButton}>
          <button className={buttonStyles(
            { color: 'primary' })}>
              Enregistrer
          </button>
          <button className={buttonStyles(
            { color: 'secondary'})}>
              Générer les autorisations
          </button>
        </div>
      </div>

      <div className={styles.formInfos}>
        <div className={styles.formAddInfos}>
          <div className={styles.firstBloc}>
            {/* Champ pour entrer le nom de l’événement */}
            <label htmlFor="eventName">Nom de votre évènement</label>
            <input
              id="eventName"
              type="text"
              name="eventName"        // Correspond à la clé de l’état
              value={form.eventName}  // Liaison avec le state `form`
              onChange={handleFormChange} // Mettre à jour l’état form
              placeholder="Entrez le nom de l'évènement"
              className={styles.inputField} // Ajout d'une classe CSS si nécessaire
            />
            <div className={styles.formAddGroup}>
              <AddGroup />
            </div>
            <div className={styles.formAddParticipants}>
              <AddParticipant 
              participantInGroup={participantInGroup}
              setParticipantInGroup={setParticipantInGroup}
              />
            </div>
            <div className={styles.formAddDate}>
            <AddDate form={form} handleFormChange={handleFormChange} />
            </div>
            {/* <div className={styles.formAddLocation}>
              <AddLocation />
            </div> */}
          </div>
          <div className={styles.secondBloc}> 
            {participantInGroup.map((participant, index) => (
              <p key={index}>
                {participant.label}{" "}
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => handleRemoveParticipant(participant.id)}
                />
              </p>
            ))}
          </div>
        </div>
        <div className={styles.formAddCom}>
          <AddCom />
        </div>
      </div>
    </div>
  );
}

export default EventPage;
