import styles from "../../styles/Groups.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { buttonStyles } from "../modules/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import AddGroup from "./AddGroup";

function Add() {
  const [participantInGroup, setParticipantInGroup] = useState([]);
  const [titleGroup, setTitleGroup] = useState("");
  const [msgCreationGroup, setMsgCreationGroup] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const admin = useSelector((state) => state.admin.value);

  // supprimer le participant du groupe en fonction de son ID
  const handleRemoveParticipant = (id) => {
    setParticipantInGroup(participantInGroup.filter((e) => e.id !== id));
  };

  const handleSubmit = () => {
    if (participantInGroup.length === 0) {
      console.log("aucun participant");
      setIsCreated(false);
      return setMsgCreationGroup(
        "Veuillez - ajouter des participants au groupe"
      );
    }

    const newParticipantIds = participantInGroup.map((e) => e.id);

    fetch(
      `http://localhost:3000/groups/add/${admin.infoAdmin.id}/${admin.etablissement}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: titleGroup,
          adminId: admin.infoAdmin.id,
          etablissementId: admin.etablissement,
          participantIds: newParticipantIds,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setMsgCreationGroup(data.message);
        setIsCreated(data.result);
      });
  };

  return (
    <div className={styles.groupContainer}>
      <div className={styles.groupHeader}>
        <button
          onClick={handleSubmit}
          className={buttonStyles({ color: "secondary" })}
        >
          Enregistrer
        </button>
      </div>

      <div className={styles.groupInfos}>
        <div>
          <AddGroup
            participantInGroup={participantInGroup}
            setParticipantInGroup={setParticipantInGroup}
            titleGroup={titleGroup}
            setTitleGroup={setTitleGroup}
            msgCreationGroup={msgCreationGroup}
            isCreated={isCreated}
          />
        </div>
        <div>
          <h3>Box de participants</h3>
          <div className={styles.boxContainer}>
            {participantInGroup.map((participant, index) => (
              <p
                onClick={() => handleRemoveParticipant(participant.id)}
                style={{ cursor: "pointer" }}
                key={index}
              >
                {participant.label}
                <FontAwesomeIcon icon={faXmark} />
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
