import { cva } from 'class-variance-authority';
import styles from "../../styles/modules/Dropdown.module.css";

export const dropdownStyles = cva(
  styles.formGroup, // class de base
  {
    variants: {
      size: {
        small: styles.formGroupSmall,
        medium: styles.formGroupMedium,
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

export const dropdownLabelStyles = cva(
  styles.label, // class de base
  {
    variants: {
      color: {
        primary: styles.labelPrimary,
        secondary: styles.labelSecondary,
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  }
);

export const Dropdown = ({ children, className, size, label, ...props }) => {
  return (
    <div className={dropdownStyles({ size })}>
      <select
        className={styles.select}
        {...props}
      >
        <option value=""></option>
      </select>
      <label className={dropdownLabelStyles({ color: 'primary' })}>{label}</label>
      <ul className={styles.options}>
        {children}
      </ul>
    </div>
  );
};