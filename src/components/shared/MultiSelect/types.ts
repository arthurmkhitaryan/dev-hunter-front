export interface Option {
  value: string | number;
  label: string;
}

export interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (newValues: string[]) => void;
  placeholder?: string;
}
