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
  const admin = useSelector((state) => state.admin.value);

  // supprimer le participant du groupe en fonction de son ID
  const handleRemoveParticipant = (id) => {
    setParticipantInGroup(participantInGroup.filter((e) => e.id !== id));
  };

  const handleSubmit = () => {
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
        console.log(data.result, data.message);
      });
  };

  return (
    <div className={styles.groupContainer}>
      <div className={styles.groupHeader}>
        <p>Compléter les informations du groupe</p>
        <div className={styles.formButton}>
          <button
            onClick={handleSubmit}
            className={buttonStyles({ color: "primary" })}
          >
            Enregistrer
          </button>
        </div>
      </div>

      <div className={styles.groupInfos}>
        <AddGroup
          participantInGroup={participantInGroup}
          setParticipantInGroup={setParticipantInGroup}
          titleGroup={titleGroup}
          setTitleGroup={setTitleGroup}
        />
        <div>
          <h3>Box de participant</h3>

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
    </div>
  );
}

export default Add;
