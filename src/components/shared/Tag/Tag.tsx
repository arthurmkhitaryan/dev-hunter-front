import { type FC, type ReactNode } from 'react';

// styles
import * as S from './Tag.styled';

interface TagProps {
  children: ReactNode;
  isMatched?: boolean;
}

export const Tag: FC<TagProps> = ({ children, isMatched = false }) => {
  return (
    <S.TagWrapper $isMatched={isMatched}>
      <S.TagText $isMatched={isMatched}>{children}</S.TagText>
    </S.TagWrapper>
  );
};
