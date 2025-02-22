import { useEffect, useState } from 'react';
import styles from '../../styles/Events.module.css';
import { Input } from '../modules/Input';
import { Dropdown } from '../modules/Dropdown';
import { DateInput } from '../modules/DateInput';

function AddEvent() {
  // État pour stocker la liste des groupes récupérés
  const [groupList, setGroupList] = useState([]);

  // État pour stocker les valeurs saisies dans le formulaire (+ groupe sélectionné)
  const [form, setForm] = useState({
    groupId: "", // L’ID du groupe sélectionné
    eventName: "", // Nom de l’événement
    location: "", // Lieu de l’événement
    participant: "", // Participant sélectionné
    startDate: "", // Date de début
    endDate: "", // Date de fin
  });

  // ID fictif d’établissement (remplace-le par une variable dynamique si nécessaire)
  const etablissementId = "67acf5cca21c77aa7ffbcf82";

  // Appel API pour récupérer les groupes
  useEffect(() => {
    fetch(`http://localhost:3000/groups/findAllByEtablissement/${etablissementId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // Formatage des groupes pour le Dropdown
          const formattedGroups = data.data.map((group) => ({
            value: group._id, // Identifiant du groupe
            label: group.name, // Nom du groupe
          }));
          setGroupList(formattedGroups); // Mise à jour dans l’état
        } 
      })
      .catch(console.error); // Gestion des erreurs réseau
  }, [etablissementId]);

  // Gestion des changements dans le formulaire (groupId, lieu, etc.)
  const handleFormChange = (e) => {
    const { name, value } = e.target; // Extraire le name et la valeur de l'élément déclencheur
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value, // Mettre à jour uniquement la propriété changée
    }));
  };

  return (
    <form className={styles.form}>
      {/* Champ pour entrer le nom de l’événement */}
      <Input
        label="Nom de votre évènement"
        name="eventName" // Le nom du champ à gérer
        value={form.eventName}
        onChange={handleFormChange} // Mettre à jour le state form
      />

      {/* Dropdown pour sélectionner un groupe */}
      <Dropdown
        label="Choix du groupe"
        name="groupId" // Nom du champ dans le state
        options={groupList} // Les groupes récupérés depuis l’API
        value={form.groupId} // Sélection actuelle
        onChange={handleFormChange} // Gérer le changement de sélection
      />

      {/* Dropdown pour ajouter un participant */}
      <Dropdown
        label="Ajouter un participant"
        name="participant"
        options={[
          { value: "participant1", label: "Participant 1" },
          { value: "participant2", label: "Participant 2" },
        ]}
        value={form.participant}
        onChange={handleFormChange}
      />

      {/* DateInput pour définir les dates de début et de fin */}
      <DateInput
        name="startDate"
        value={form.startDate}
        onChange={handleFormChange}
      />
      <DateInput
        name="endDate"
        value={form.endDate}
        onChange={handleFormChange}
      />

      {/* Champ pour entrer le lieu de l’événement */}
      <Input
        label="Lieu de votre évènement"
        name="location"
        value={form.location}
        onChange={handleFormChange}
      />
    </form>
  );
}

export default AddEvent;