import styles from "../../styles/Groups.module.css";
import { Input } from "../modules/Input";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { buttonStyles } from "../modules/Button";
import { green } from "@mui/material/colors";

function AddGroup({ participantInGroup, setParticipantInGroup, titleGroup, setTitleGroup, msgCreationGroup, isCreated}) {
  //state
  const [participantData, setParticipantData] = useState([]);
  const [addParticipant, setAddParticipant] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // on crée un nouveau tableau avec map, il contient des objets : l'id du participant (pour l'ajouter au groupe) + le nom du participant (pour afficher côté front) avec la clé "label" (connue par Autocomplete de MUI ). Il va itérer sur toutes les clés label et ignorer id.
  const filtredData = participantData.map((participant) => ({
    label: `${participant.firstName} ${participant.lastName}`,
    id: participant._id,
  }));

  console.log("participant group", participantInGroup);
  const admin = useSelector((state) => state.admin.value);
  console.log(participantData);
  console.log("date filtré : ", filtredData);
  //on récupère tous les participants liés à l'établissement de l'admin
  useEffect(() => {
    fetch(
      `http://localhost:3000/participants/findAllByEtablissement/${admin.etablissement}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setParticipantData(data.allParticipants);
        }
      });
  }, []);

  //ici je viens récupérer la value directement et non e.target.value car ce composant Mui AutoComplete ne le reconnaît pas (voir documentation)
  const handleChange = (e, value) => {
    setAddParticipant(value);
  };

  console.log("participant en attente : ", addParticipant);

  const handleSubmit = () => {
 if (!addParticipant) {
  return  setErrorMsg("Veuillez - sélectionner un participant");
 }

    if (
      !participantInGroup.some((e) => e.id === addParticipant.id)
    ) {
      setParticipantInGroup((prevGroup) => [...prevGroup, addParticipant]);
      setAddParticipant("");
      setErrorMsg("")
    } else {
      setErrorMsg("Participant déjà ajouté");
      console.log("participant déjà existant");
    }
  };
  console.log("participant dans un groupe: ", participantInGroup);

  return (
    <div>
      <Input onChange={(e)=>setTitleGroup(e.target.value)} value={titleGroup} label="Nom du groupe" />
      <div >
        <Autocomplete
          disablePortal
          options={filtredData}
          sx={{ width: 300}}
          renderInput={(params) => (
            <TextField {...params} label="Rechercher les participants" />
          )}
          value={addParticipant}
          onChange={handleChange}
  
        />
        <p className={styles.errorMsg}>{errorMsg}</p>
    
        {/* Button à revoir, réaliser les button carré spécial icon */}
      </div>
      <button
        onClick={handleSubmit}
        className={buttonStyles({ color: "primary" })}
      >
        Ajouter un participant
      </button>
      <p style={{color : isCreated ? "green" : "red", fontWeight: "bold", fontSize: "12" 
      }}>{msgCreationGroup}</p>
    </div>
  );
}

export default AddGroup;
