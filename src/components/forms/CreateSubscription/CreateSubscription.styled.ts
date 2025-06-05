import styled from 'styled-components';
import { typographyPreset3 } from '@/styles';
import { Button } from '@/components';

export const FormContainer = styled.form`
  max-width: 326px;
  border-radius: ${({ theme }) => theme.border.radius.sm};
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FieldContainer = styled.div``;

export const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  ${typographyPreset3};
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.palette.secondary.background};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  ${typographyPreset3};
  font-weight: 350;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.primary.background};
  }
`;

export const ErrorText = styled.span`
  color: #d8000c;
  font-size: 10px;
  padding-left: 5px;
  margin-top: 0.25rem;
  display: block;
`;

export const CreateSubscriptionButton = styled(Button)`
  max-width: 186px;
  white-space: nowrap;
`;
