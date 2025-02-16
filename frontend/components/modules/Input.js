import { cva } from 'class-variance-authority';
import styles from "../../styles/modules/Input.module.css";

export const inputStyles = cva(
  styles.formGroup, // class de base
  {
    variants: {
      size: {
        small: styles.formGroupSmall,
        medium: styles.formGroupMedium,
      },
      type: {
        text: styles.inputText,
        email: styles.inputEmail,
      },
    },
    defaultVariants: {
      size: 'medium',
      type: 'text',
    },
  }
);

export const inputLabelStyles = cva(
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

export const inputHighlightStyles = cva(
  styles.highlight, // class de base
  {
    variants: {
      color: {
        primary: styles.highlightPrimary,
        secondary: styles.highlightSecondary,
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  }
);

export const inputBarStyles = cva(
  styles.bar, // class de base
  {
    variants: {
      color: {
        primary: styles.barPrimary,
        secondary: styles.barSecondary,
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  }
);

export const Input = ({ children, className, size, type, label, ...props }) => {
  return (
    <div className={inputStyles({ size, type })}>
      <input
        className={styles.input}
        type={type}
        required
        {...props}
      />
      <span className={inputHighlightStyles({ color: 'primary' })}></span>
      <span className={inputBarStyles({ color: 'primary' })}></span>
      <label className={inputLabelStyles({ color: 'primary' })}>{label}</label>
    </div>
  );
};