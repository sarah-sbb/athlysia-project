import { useState } from 'react';
import moment from "moment"; 
import styles from '../../styles/Events.module.css';
import { DateInput } from '../modules/DateInput';

function AddDate({ form, handleFormChange }) {
    // États locaux pour afficher une erreur relative à la validation des dates
    const [error, setError] = useState(null);

    // Validation des dates
    const validateDates = (dateStart, dateEnd) => {
      if (!moment.isMoment(dateStart)) dateStart = moment(dateStart);
      if (!moment.isMoment(dateEnd)) dateEnd = moment(dateEnd);
  
      if (dateStart.isAfter(dateEnd)) {
        setError("La date de début ne peut pas être après la date de fin.");
      } else {
        setError(null);
      }
    };

    // Mapping des noms de champs backend vers les noms utilisés par l'interface DateInput
    const getUIFieldName = (backendField) => {
      const mapping = {
        'dateStart': 'startDate',
        'dateEnd': 'endDate'
      };
      return mapping[backendField] || backendField;
    };

    // Mapping inverse des noms d'interface vers les noms backend
    const getBackendFieldName = (uiField) => {
      const mapping = {
        'startDate': 'dateStart',
        'endDate': 'dateEnd'
      };
      return mapping[uiField] || uiField;
    };

    const handleDateChange = (e) => {
      const { name, value } = e.target;
      const backendFieldName = getBackendFieldName(name);
      
      // Créer un nouvel événement avec le nom de champ mappé pour le backend
      const mappedEvent = {
        target: {
          name: backendFieldName,
          value: value
        }
      };
  
      // Validation des dates (en utilisant les noms d'interface)
      if (name === "startDate") {
        validateDates(value, form.dateEnd);
      } else if (name === "endDate") {
        validateDates(form.dateStart, value);
      }
  
      // Propager les changements au parent avec les noms de champs mappés
      handleFormChange(mappedEvent);
    };

    return (
      <form className={styles.form}>
        {/* DateInput continue d'utiliser startDate/endDate pour l'interface */}
        <DateInput
          id="startDate"
          name="startDate"
          type="date"
          value={form?.dateStart || ""} // Utilisez dateStart du formulaire parent
          onChange={handleDateChange}
        />

        <DateInput
          id="endDate"
          name="endDate"
          type="date"
          value={form?.dateEnd || ""} // Utilisez dateEnd du formulaire parent
          onChange={handleDateChange}
        />

        {/* Affichage de l'erreur si la validation échoue */}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    );
}

export default AddDate;