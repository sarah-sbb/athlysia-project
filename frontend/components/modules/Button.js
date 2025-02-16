import { cva } from 'class-variance-authority';

const buttonStyles = cva(
  'btn', // base class
  {
    variants: {
      size: {
        small: 'btnSmall',
        medium: 'btnMedium',
        large: 'btnLarge',
      },
      color: {
        primary: 'btnPrimary',
        secondary: 'btnSecondary',
      },
    },
    defaultVariants: {
      size: 'medium',
      color: 'primary',
    },
  }
);