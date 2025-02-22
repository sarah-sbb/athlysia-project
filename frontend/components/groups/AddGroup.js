import styles from '../../styles/Groups.module.css';
import { Input } from '../modules/Input';
import { Dropdown } from '../modules/Dropdown';
import { Button } from '../modules/Button';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const table = ["BEN HAJ Hassen", "BARACK OBAMA", "CLINTON", "Paris", "Paris", "Paris", "Paris", "Paris", "Paris", "Paris", "Paris"]

function AddGroup() {
  return (
      <form className={styles.form}>      
        <Input label="Nom du groupe" />
        <div className={styles.formAddGroupPart}>
        <Autocomplete
      disablePortal
      options={table}
      sx={{ width: 400 }}
      renderInput={(params) => <TextField {...params} label="Ajouter un participant" />}
    />
            {/* Button à revoir, réaliser les button carré spécial icon */}
        </div>
      </form>
  );
}

export default AddGroup;