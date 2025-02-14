import AddEvent from "./AddEvent";
import AddParticipant from "./AddParticipant";
import AddCom from "./AddCom";

function EventPage () {
  return (
    <div>
      <AddEvent />
      <AddParticipant />
      <AddCom />
    </div>

  );
}

export default EventPage;
