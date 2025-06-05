import styled from 'styled-components';
import { typographyPreset4 } from '@/styles';

export const CandidatesContainer = styled.div``;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 308px);
  column-gap: 16px;
  row-gap: 16px;
`;

export const Title = styled.h2`
  ${typographyPreset4};
  margin-bottom: 16px;
  color: ${({ theme }) => theme.palette.common.black};
`;
