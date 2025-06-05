import { type FC, type ReactNode } from 'react';

// styles
import * as S from './StandardLayout.styled';

interface StandardLayoutProps {
  title: string;
  children: ReactNode;
}

export const StandardLayout: FC<StandardLayoutProps> = ({ title, children }) => {
  return (
    <S.LayoutContainer>
      <S.Title>{title}</S.Title>
      <S.Content>{children}</S.Content>
    </S.LayoutContainer>
  );
};
