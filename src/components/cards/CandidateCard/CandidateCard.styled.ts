import styled from 'styled-components';
import { typographyPreset3, typographyPreset6 } from '@/styles';

export const CandidateCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 308px;
  width: 100%;
  min-height: 320px;
  border: 1px solid ${({ theme }) => theme.palette.primary.border};
  border-radius: ${({ theme }) => theme.border.radius.md};
  padding: 16px;
  gap: 8px;
  position: relative;
`;

export const New = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.yellow};
  padding: 0 6px;
  ${typographyPreset6};
  color: ${({ theme }) => theme.palette.primary.textWarning};
  position: absolute;
  top: 20px;
  right: 16px;
  border-radius: ${({ theme }) => theme.border.radius.xl};
`;

export const CandidateFullName = styled.p``;

export const Conditions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ConditionItem = styled.div<{ $minHeight?: number }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: ${({ $minHeight }) => ($minHeight ? `${$minHeight}px` : 'auto')};
`;

export const ConditionLabel = styled.h5`
  ${typographyPreset3};
  color: ${({ theme }) => theme.palette.primary.textColor};
`;

export const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 282px;
`;
