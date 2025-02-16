import { cva } from 'class-variance-authority';
import styles from "../../styles/modules/Button.module.css";

export const buttonStyles = cva(
  styles.btn, // class de base
  {
    variants: {
      size: {
        small: styles.btnSmall,
        medium: styles.btnMedium,
      },
      color: {
        primary: styles.btnPrimary,
        secondary: styles.btnSecondary,
      },
    },
    defaultVariants: {
      size: styles.medium,
      color: styles.primary,
    },
  }
);