import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function DeleteParticipant() {
  const router = useRouter();
  const { id } = router.query; 
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/participants/delete/${id}`)
        .then((response) => {
          if (response.data.result) {
            setMessage("Participant deleted successfully!");
            setTimeout(() => {
              router.push("/"); // ramène à la page d'acceuil
            }, 2000);
          } else {
            setMessage("Error: " + response.data.message);
          }
        })
        .catch((error) => {
          setMessage("An error occurred while deleting the participant.");
          console.error(error);
        });
    }
  }, [id, router]);

  return (
    <div>
      <h1>Deleting Participant...</h1>
      <p>{message}</p>
    </div>
  );
}

export default DeleteParticipant;