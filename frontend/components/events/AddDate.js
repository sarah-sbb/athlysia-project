import { useEffect, useState } from 'react';
import moment from "moment"; // Importation de la bibliothèque moment.js
import styles from '../../styles/Events.module.css';
import { DateInput } from '../modules/DateInput';

function AddDate({ form, handleFormChange }) {
    // États locaux pour afficher une erreur relative à la validation des dates
    const [error, setError] = useState(null);

    // Validation des dates
    const validateDates = (startDate, endDate) => {
      if (!moment.isMoment(startDate)) startDate = moment(startDate);
      if (!moment.isMoment(endDate)) endDate = moment(endDate);
  
      if (startDate.isAfter(endDate)) {
        setError("La date de début ne peut pas être après la date de fin.");
      } else {
        setError(null);
      }
    };

    const handleDateChange = (e) => {
      const { name, value } = e.target;
  
      if (form) {
        // Valider les dates
        if (name === "startDate") {
          validateDates(value, form.endDate);
        } else if (name === "endDate") {
          validateDates(form.startDate, value);
        }
      }
  
      // Propager les changements au parent
      handleFormChange(e);
    };

  return (
    <form className={styles.form}>
      {/* DateInput pour définir les dates de début et de fin */}
      <DateInput
        id="startDate"
        name="startDate"
        type="date"
        value={form?.startDate || ""} // Tolère les undefined
        onChange={handleDateChange} // On passe notre propre handler pour inclure la validation
      />

      <DateInput
        id="endDate"
        name="endDate"
        type="date"
        value={form?.endDate || ""} // Tolère les undefined
        onChange={handleDateChange} // Même logique que startDate
      />

      {/* Affichage de l'erreur si la validation échoue */}
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

export default AddDate;