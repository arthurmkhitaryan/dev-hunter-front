import styled from 'styled-components';
import { typographyPreset2, typographyPreset3 } from '@/styles';

export const ManageContainer = styled.div`
  display: flex;
  gap: 80px;
  width: 100%;
  margin: 40px 0 64px;
`;

export const Subscriptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 22px;
  row-gap: 22px;
`;

export const NoMatched = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  ${typographyPreset2};
  color: ${({ theme }) => theme.palette.common.black};
`;

export const Description = styled.p`
  margin-top: 16px;
  ${typographyPreset3};
  font-weight: 350;
  color: ${({ theme }) => theme.palette.secondary.textColor};
`;
