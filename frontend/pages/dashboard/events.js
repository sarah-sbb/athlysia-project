import Events from "../../components/Events"
import LayoutD from "../../components/LayoutD";

function EventPage() {
  return < Events/>;
}
Index.getLayout = function getLayout(page) {
  return <LayoutD>{page}</LayoutD>;
};
export default EventPage;
