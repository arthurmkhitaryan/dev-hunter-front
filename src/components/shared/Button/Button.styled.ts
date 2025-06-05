import styled from 'styled-components';
import type { IButtonProps } from './types.ts';
import { typographyPreset1 } from '@/styles';

export const Button = styled.button<IButtonProps>`
  ${typographyPreset1};
  color: ${({ variant, theme }) =>
    variant === 'filled' ? theme.palette.common.white : theme.palette.common.black};
  background-color: ${({ variant, theme }) =>
    variant === 'filled' ? theme.palette.primary.background : theme.palette.secondary.background};
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.border.radius.sm};
  font-family: inherit;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #422ffa;
    transition: background-color 0.3s ease-in-out;
  }
`;
