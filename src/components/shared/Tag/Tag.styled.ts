import styled from 'styled-components';
import { typographyPreset6 } from '@/styles';

export const TagWrapper = styled.div<{ $isMatched: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, $isMatched }) =>
    $isMatched ? theme.palette.primary.backgroundLightGreen : theme.palette.primary.paper};
  border: 1px solid
    ${({ theme, $isMatched }) =>
      $isMatched ? theme.palette.primary.green : theme.palette.primary.border};
  border-radius: ${({ theme }) => theme.border.radius.lg};
`;

export const TagText = styled.p<{ $isMatched: boolean }>`
  ${typographyPreset6};
  padding: 4px 12px;
  white-space: nowrap;
  color: ${({ theme, $isMatched }) =>
    $isMatched ? theme.palette.primary.green : theme.palette.primary.textColor};
`;
