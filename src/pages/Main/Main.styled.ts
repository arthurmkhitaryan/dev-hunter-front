import styled from 'styled-components';
import { typographyPreset2 } from '@/styles';

export const MainContainer = styled.div`
  padding: 20px 0;
`;

export const MainTitle = styled.h1`
  ${typographyPreset2};
  color: ${({ theme }) => theme.palette.common.black};
`;
