import styled from 'styled-components';
import { typographyPreset3, typographyPreset5 } from '@/styles';

export const SubscriptionCardContainer = styled.div<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  max-width: 334px;
  width: 100%;
  min-height: 300px;
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.palette.primary.backgroundGreen : theme.palette.common.white};
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.palette.primary.green : theme.palette.primary.border};
  border-radius: ${({ theme }) => theme.border.radius.md};
  padding: 16px;
  gap: 8px;
  cursor: pointer;
  position: relative;
`;

export const Icon = styled.img`
  position: absolute;
  top: 12px;
  right: 14px;
`;

export const CandidatesCount = styled.span`
  color: ${({ theme }) => theme.palette.secondary.textColor};
  ${typographyPreset5};
`;

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
  width: 302px;
`;
