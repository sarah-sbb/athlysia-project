import { cva } from 'class-variance-authority';
import styles from "../../styles/modules/DateInput.module.css";

export const dateInputStyles = cva(
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

export const dateInputLabelStyles = cva(
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

export const DateInput = ({ children, className, size, label, ...props }) => {
  return (
    <div className={dateInputStyles({ size })}>
      <input
        type="date"
        className={styles.dateInput}
        {...props}
      />
      <label className={dateInputLabelStyles({ color: 'primary' })}>{label}</label>
    </div>
  );
};