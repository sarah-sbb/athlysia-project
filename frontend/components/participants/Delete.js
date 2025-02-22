import { useState } from "react";

export default function DeleteParticipant() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:3001/participants/delete/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setMessage("Participant deleted successfully!");
      setId(""); // Clear input field
    } else {
      setMessage("Participant non effacé. Veuillez réssayer.");
    }
  };

  return (
    <div>
      <h2>Delete Participant</h2>
      <form onSubmit={handleDelete}>
        <input
          type="text"
          placeholder="Participant ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <button type="submit">Delete</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
