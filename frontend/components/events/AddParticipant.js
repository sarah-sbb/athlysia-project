import { useEffect, useState } from 'react';
import styles from '../../styles/Events.module.css';
import { Dropdown } from '../modules/Dropdown';

function AddParticipant({ etablissementId, form, handleFormChange }) {
  // État local pour stocker les participants
  const [participantList, setParticipantList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour charger les participants depuis l'API
  const fetchParticipants = async () => {
    try {
      const response = await fetch(
        `/api/participants/findAllByEtablissement/${etablissementId}`
      ); // Fetch les participants liés à l'établissement
      const result = await response.json();

      if (result.result) {
        setParticipantList(result.allParticipants); // Mettre à jour les participants
      } else {
        setError(result.message); // Affichage d'un message d'erreur si la réponse contient une erreur
      }
    } catch (err) {
      setError("Erreur lors du chargement des participants."); // Gestion d'erreur réseau
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  // Appel de fetchParticipants au montage ou lorsque l'ID de l'établissement change
  useEffect(() => {
    if (etablissementId) {
      fetchParticipants();
    }
  }, [etablissementId]); // Se met à jour lorsque etablissementId change

  return (
    <form className={styles.form}>
      {loading && <p>Chargement des participants...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && (
        <Dropdown
          label="Ajouter un participant"
          name="participantId" // Équivaut à la clé de l'état correspondant
          options={participantList.map((participant) => ({
            value: participant._id, // ID du participant
            label: `${participant.firstName} ${participant.lastName}`, // Nom du participant
          }))}
          value={form.participantId} // valeur actuelle liée au state global
          onChange={handleFormChange} // Fonction de modification de l'état
        />
      )}
    </form>
  );
}

export default AddParticipant;