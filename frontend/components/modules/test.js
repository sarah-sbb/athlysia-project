import { Button } from "./components/Button";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  return (
    <>
      {/* Bouton classique arrondi */}
      <Button color="primary" size="medium">Cliquez-moi</Button>

      {/* Bouton carré avec une icône */}
      <Button color="secondary" shape="square" icon={faCaretDown} />
    </>
  );
}
