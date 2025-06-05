import styled from 'styled-components';

export const MultiSelectContainer = styled.div`
  position: relative;
  user-select: none;
`;

export const MultiSelectHeader = styled.div`
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.palette.secondary.background};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  background: ${({ theme }) => theme.palette.common.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PlaceholderText = styled.span`
  color: ${({ theme }) => theme.palette.primary.textColor};
`;

export const SelectedItemsText = styled.span`
  flex: 1;
  color: ${({ theme }) => theme.palette.primary.textColor};
`;

export const Caret = styled.span<{ $isOpen: boolean }>`
  margin-left: 0.5rem;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #333;
  transition: transform 0.2s ease;
  ${({ $isOpen }) => $isOpen && 'transform: rotate(180deg);'}
`;

export const OptionsList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  padding: 0.25rem 0;
  list-style: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const OptionItem = styled.li`
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background: #f0f0f0;
  }
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 0.5rem;
`;
