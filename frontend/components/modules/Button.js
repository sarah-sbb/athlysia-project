import React from "react";
import { cva } from "class-variance-authority";
import styles from "../../styles/modules/Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const buttonStyles = cva(
  styles.btn, // Classe de base
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
      shape: {
        square: styles.btnSquare,
        rounded: styles.btnRounded,
      },
    },
    defaultVariants: {
      size: "medium", // Utilisation des clés définies dans variants
      color: "primary",
      shape: "rounded",
    },
  }
);

export const Button = ({
  children,
  className = "",
  size,
  color,
  shape,
  icon,
  ...props
}) => {
  return (
    <button
      className={`${buttonStyles({ size, color, shape })} ${className}`}
      {...props}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {children}
    </button>
  );
};