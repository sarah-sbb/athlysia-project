import styles from "../../styles/Events.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Dropdown } from "../modules/Dropdown";
import { buttonStyles } from "../modules/Button";

function AddGroup({ groupInEtablissement, setGroupInEtablissement }) {
  // Initialise l'état groupData comme tableau vide
  const [groupData, setGroupData] = useState([]); // Données des groupes disponibles
  const [addGroup, setAddGroup] = useState(""); // Groupe à ajouter au formulaire
  const [errorMsg, setErrorMsg] = useState("");

  // Crée un tableau filtré pour le menu déroulant
  const filtredData = groupData.map((group) => ({
    label: `${group.name}`, // Nom affiché dans le menu déroulant
    id: group._id, // Identifiant unique du groupe
  }));

  // Récupére les données de l'administrateur connecté via Redux
  const admin = useSelector((state) => state.admin.value);

  // Récupére les groupes liés à l'établissement de l'administrateur
  useEffect(() => {
    fetch(
      `http://localhost:3000/groups/findAllByEtablissement/${admin.etablissement}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setGroupData(data.data); // Stocke les groupes récupérés
        }
      });
  }, []);

  // Met à jour l'état addGroup lorsque l'utilisateur sélectionne un groupe dans le Dropdown
  const handleChange = (event, value) => {
    setAddGroup(value); // Met à jour le groupe sélectionné
  };

  // Ajoute le groupe sélectionné lorsque l'utilisateur clique sur "Ajouter un groupe"
  const handleSubmit = () => {
    // Vérifie si un groupe est sélectionné et qu'il n'est pas déjà ajouté
    if (
      addGroup && // Un groupe est sélectionné
      !groupInEtablissement.some((g) => g.id === addGroup.id) // Le groupe n'est pas déjà ajouté
    ) {
      setGroupInEtablissement((prevGroup) => [...prevGroup, addGroup]); // Ajoute le groupe
      setAddGroup(""); // Réinitialise le champ après ajout
    } else {
      setErrorMsg("Participant déjà ajouté");
      console.log("participant déjà existant");
    }
  };

  return (
    <div>
        {/* Dropdown pour sélectionner un groupe */}
        <Dropdown
          disablePortal
          options={filtredData} // Groupes formatés pour le Dropdown
          sx={{ width: 400 }}
          label="Choisissez un groupe"
          value={addGroup} // Groupe sélectionné
          onChange={handleChange} // Gestion de la sélection
        />

      {/* Bouton pour valider l'ajout du groupe */}
      <button
        type="button" // Empêcher le rechargement de la page
        onClick={handleSubmit} // Ajouter le groupe sélectionné
        className={buttonStyles({ color: "primary" })}
      >
        Ajouter un groupe
      </button>
    </div>
  );
}

export default AddGroup;