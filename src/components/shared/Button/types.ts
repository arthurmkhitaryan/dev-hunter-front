import { type HTMLProps } from 'react';

export type ButtonVariant = 'filled' | 'bordered';

export interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  variant?: ButtonVariant;
}
