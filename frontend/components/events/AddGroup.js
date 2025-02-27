import { useEffect, useState } from 'react';
import styles from '../../styles/Events.module.css';
import { Dropdown } from '../modules/Dropdown';

function AddGroup({ etablissementId, form, handleFormChange }) {
  // État local pour stocker les groupes
  const [groupList, setGroupList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fonction pour récupérer la liste des groupes
  const fetchGroups = async () => {
    try {
      const response = await fetch(
        `/api/groups/findAllByEtablissement/${etablissementId}`
      );
      const result = await response.json();

      if (result.result) {
        setGroupList(result.data); // Mise à jour de la liste des groupes
      } else {
        setError(result.message); // Gestion de l'erreur renvoyée par le back-end
      }
    } catch (err) {
      setError("Erreur lors du chargement des groupes."); // Erreur réseau
    } finally {
      setLoading(false); // Arrêter le chargement
    }
  };
  useEffect(() => {
    if (etablissementId) {
      fetchGroups();
    }
  }, [etablissementId]); // Recharge les données si l'ID de l'établissement change

  return (
    <form className={styles.form}>
      {loading && <p>Chargement des groupes...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && (
        <Dropdown
          label="Choisissez un groupe"
          name="groupId"                 // Gestion du state avec le champ correspondant
          options={groupList.map(group => ({
            value: group._id,           // ID du groupe
            label: group.name,          // Nom du groupe
          }))}
          value={form.groupId}          // Récupération de la valeur actuelle
          onChange={handleFormChange}   // Fonction pour gérer les changements
        />
      )}
    </form>
  );
}

export default AddGroup;