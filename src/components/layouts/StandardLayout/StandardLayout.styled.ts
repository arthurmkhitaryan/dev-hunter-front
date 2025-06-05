import styled from 'styled-components';
import { typographyPreset4 } from '@/styles';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled.h2`
  ${typographyPreset4};
  color: ${({ theme }) => theme.palette.common.black};
`;

export const Content = styled.div``;
