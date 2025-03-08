import styles from '../../styles/Events.module.css';
import { useState } from "react";
import { useSelector } from "react-redux";
import { buttonStyles } from '../modules/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";

import AddGroup from "./AddGroup";
import AddDate from "./AddDate";
import AddCom from "./AddCom";

function AddEvent() {
  // Récupérer les info admin depuis Redux
  const admin = useSelector((state) => state.admin.value);

  // États centralisés
  const [form, setForm] = useState({
    eventName: "",
    location: "",
    startDate: "",
    endDate: "",
  });
  
  // Utiliser le nom de prop attendu par AddGroup: groupInEtablissement
  const [groupInEtablissement, setGroupInEtablissement] = useState([]);
  const [participantInGroup, setParticipantInGroup] = useState([]);
  const [msgCreationEvent, setMsgCreationEvent] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  // Fonction pour mettre à jour les valeurs du formulaire
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Supprimer le participant du groupe en fonction de son ID
  const handleRemoveParticipant = (id) => {
    setParticipantInGroup(participantInGroup.filter((e) => e.id !== id));
  };
  
  // Supprimer un groupe de l'événement
  const handleRemoveGroup = (id) => {
    setGroupInEtablissement(groupInEtablissement.filter((group) => group.id !== id));
  };

  // Ajouter un événement
  const handleSubmitEvent = () => {
    if (groupInEtablissement.length === 0) {
      setIsCreated(false);
      return setMsgCreationEvent("Veuillez ajouter au moins un groupe");
    }

    const groupIds = groupInEtablissement.map((group) => group.id);

    fetch(`http://localhost:3000/events/add/${admin.infoAdmin.id}/${admin.etablissement}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.eventName,
        adminId: admin.infoAdmin.id,
        etablissementId: admin.etablissement,
        groupIds: groupIds,
        location: form.location,
        startDate: form.startDate,
        endDate: form.endDate
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      setMsgCreationEvent(data.message);
      setIsCreated(data.result);
    })
    .catch(error => {
      console.error("Erreur lors de la création de l'événement:", error);
      setMsgCreationEvent("Erreur lors de la création de l'événement");
      setIsCreated(false);
    });
  };
  
  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2>Votre évènement</h2>
        <div className={styles.formButton}>
          <button 
            onClick={handleSubmitEvent}
            className={buttonStyles({ color: 'primary' })}>
            Enregistrer
          </button>
          <button className={buttonStyles({ color: 'secondary'})}>
            Générer les autorisations
          </button>
        </div>
      </div>

      <div className={styles.formInfos}>
        <div className={styles.formAddInfos}>
          <div className={styles.firstBloc}>
            {/* Champ pour entrer le nom de l'événement */}
            <TextField   
              sx={{ width: 400, marginBottom: 2, marginTop: 1}} 
              onChange={(e) => handleFormChange({ target: { name: 'eventName', value: e.target.value } })} 
              value={form.eventName} 
              label="Nom de l'événement" 
              name="eventName"
            />
            <div className={styles.formAddGroup}>
              <AddGroup 
                groupInEtablissement={groupInEtablissement}
                setGroupInEtablissement={setGroupInEtablissement}
              />
            </div>
            <div className={styles.formAddDate}>
              <AddDate form={form} handleFormChange={handleFormChange} />
            </div>
          </div>
          <div className={styles.secondBloc}>
            {/* Affichage des groupes sélectionnés */}
            {groupInEtablissement.length > 0 && (
              <div>
                <h4>Groupes sélectionnés:</h4>
                {groupInEtablissement.map((group, index) => (
                  <p key={index}>
                    {group.label}{" "}
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={() => handleRemoveGroup(group.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </p>
                ))}
              </div>
            )}
            
            {/* Affichage des participants */}
            {participantInGroup.map((participant, index) => (
              <p key={`participant-${index}`}>
                {participant.label}{" "}
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => handleRemoveParticipant(participant.id)}
                  style={{ cursor: "pointer" }}
                />
              </p>
            ))}
          </div>
        </div>
        <div className={styles.formAddCom}>
          <AddCom />
        </div>
      </div>
      
      {/* Message de confirmation ou d'erreur */}
      {msgCreationEvent && (
        <div className={isCreated ? styles.successMessage : styles.errorMessage}>
          {msgCreationEvent}
        </div>
      )}
    </div>
  );
}

export default AddEvent;
