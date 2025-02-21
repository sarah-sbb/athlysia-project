import React, { useState } from "react"; // useState pour suivre la valeur sélectionnée 
// et supprimer le texte du label lorsque l'option est sélectionné
import { cva } from "class-variance-authority";
import styles from "../../styles/modules/Dropdown.module.css";

export const dropdownStyles = cva(
  styles.formGroup, // Classe de base
  {
    variants: {
      size: {
        small: styles.formGroupSmall,
        medium: styles.formGroupMedium,
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export const dropdownLabelStyles = cva(
  styles.label, // Classe de base
  {
    variants: {
      color: {
        primary: styles.labelPrimary,
        secondary: styles.labelSecondary,
      },
    },
    defaultVariants: {
      color: "primary",
    },
  }
);

export const Dropdown = ({
  className,
  size,
  label,
  options = [],
  defaultValue = "",
  onChange,
  ...props
}) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    
    const handleChange = (e) => {
      setSelectedValue(e.target.value); // Met à jour la valeur sélectionnée
      if (onChange) onChange(e); // Appelle la méthode onChange si elle est fournie
    };

  return (
    <div className={`${dropdownStyles({ size })} ${className || ""}`}>
      {/* Ajout d'une classe conditionnelle sur le label */}
      <label
        className={`${dropdownLabelStyles({ color: "primary" })} ${
          selectedValue ? styles.labelActive : ""
        }`}
      >
        {label}
      </label>
      <select
        className={styles.select}
        value={selectedValue} // Lier la valeur sélectionnée
        onChange={handleChange} // Gestion de l'événement onChange
        {...props}
      >
        <option value="" disabled hidden></option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};