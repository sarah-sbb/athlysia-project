import styles from "../../styles/Events.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function AddGroup({ groupInEtablissement, setGroupInEtablissement }) {
  // Initialise l'état groupData comme tableau vide
  const [groupData, setGroupData] = useState([]); // Données des groupes disponibles
  const [addGroup, setAddGroup] = useState(""); // Groupe à ajouter au formulaire
  const [errorMsg, setErrorMsg] = useState("");

console.log(groupData);

  // Crée un tableau filtré pour le menu déroulant
  const filtredData = groupData.map((group) => ({
    label: `${group.title}`, // Nom affiché dans le menu déroulant
    id: group._id, // Identifiant unique du groupe
  }));

console.log(filtredData);

  // Récupére les données de l'administrateur connecté via Redux
  const admin = useSelector((state) => state.admin.value);

  // Récupére les groupes liés à l'établissement de l'administrateur
  useEffect(() => {
    fetch(
      `http://localhost:3000/groups/findAllGroupsByEtablissement/${admin.etablissement}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data.allGroups);
          setGroupData(data.allGroups); // Stocke les groupes récupérés
        }
      });
  }, []);

  // Met à jour l'état addGroup lorsque l'utilisateur sélectionne un groupe dans le Dropdown
  const handleChange = (event, value) => {
    console.log("value", value);
    setAddGroup(value); // Met à jour le groupe sélectionné
  };
  // le handleChange est censé stocké le groupe que je vais sélectionner dans le dropdown

  console.log(addGroup);

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
      setErrorMsg("Groupe déjà ajouté");
      console.log("Groupe déjà existant");
    }
  };

  return (
    <div>
        {/* Dropdown pour sélectionner un groupe */}
          <Autocomplete
            disablePortal
            options={filtredData}
            sx={{ width: 400, marginBottom: 5}}
            renderInput={(params) => (
              <TextField {...params} label="ajouter un groupe" />
            )}
            value={addGroup}
            onChange={handleChange}
          />
    </div>
  );
}

export default AddGroup;