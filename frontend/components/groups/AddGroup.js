import styles from '../../styles/Groups.module.css';
import { Input } from '../modules/Input';
import { Dropdown } from '../modules/Dropdown';
import { Button } from '../modules/Button';
import { faPlus } from "@fortawesome/free-solid-svg-icons";


function AddGroup() {
  return (
      <form className={styles.form}>      
        <Input label="Nom du groupe" />
        <div className={styles.formAddGroupPart}>
            <Dropdown label="Ajouter un participant">
                <li>Sélectionner un groupe</li>
                <li>Groupe 1</li>
                <li>Groupe 2</li>
                <li>Groupe 3</li>
            </Dropdown>
            {/* Button à revoir, réaliser les button carré spécial icon */}
           <Button color="secondary" shape="square" icon={faPlus} />
        </div>
      </form>
  );
}

export default AddGroup;