import { type FC, useEffect, useRef, useState } from 'react';
import * as S from './MultiSelect.styled';
import type { Option } from './types';

export interface MultiSelectProps {
  options: Option[];
  value: string | string[];
  onChange: (newValue: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
}

export const MultiSelect: FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select',
  multiple = true,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (optValue: string) => {
    if (multiple) {
      const arrValue = Array.isArray(value) ? value : [];
      if (arrValue.includes(optValue)) {
        onChange(arrValue.filter((v) => v !== optValue));
      } else {
        onChange([...arrValue, optValue]);
      }
    } else {
      onChange(optValue);
      setIsOpen(false);
    }
  };

  const selectedLabels = (() => {
    if (multiple) {
      const arrValue = Array.isArray(value) ? value : [];
      return options
        .filter((opt) => arrValue.includes(opt.value.toString()))
        .map((opt) => opt.label)
        .join(', ');
    } else {
      const strValue = typeof value === 'string' ? value : '';
      const match = options.find((opt) => opt.value.toString() === strValue);
      return match ? match.label : '';
    }
  })();

  return (
    <S.MultiSelectContainer ref={containerRef}>
      <S.MultiSelectHeader onClick={() => setIsOpen((o) => !o)}>
        {selectedLabels ? (
          <S.SelectedItemsText>{selectedLabels}</S.SelectedItemsText>
        ) : (
          <S.PlaceholderText>{placeholder}</S.PlaceholderText>
        )}
        <S.Caret $isOpen={isOpen} />
      </S.MultiSelectHeader>

      {isOpen && (
        <S.OptionsList>
          {options.map((opt) => {
            const isChecked = multiple
              ? Array.isArray(value) && value.includes(opt.value.toString())
              : value === opt.value.toString();
            return (
              <S.OptionItem key={opt.value} onClick={() => toggleOption(opt.value.toString())}>
                {multiple && <S.Checkbox checked={isChecked} onChange={() => {}} />}
                {opt.label}
              </S.OptionItem>
            );
          })}
        </S.OptionsList>
      )}
    </S.MultiSelectContainer>
  );
};
