import { type FC } from 'react';

// styles
import * as S from './Button.styled.ts';
import { type IButtonProps } from './types.ts';

export const Button: FC<IButtonProps> = ({ children, variant = 'filled', ...rest }) => {
  return (
    <S.Button variant={variant} {...rest}>
      {children}
    </S.Button>
  );
};
