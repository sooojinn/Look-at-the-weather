import { Controller } from 'react-hook-form';
import OptionBtn from './OptionBtn';
import { SelectProps } from '@/config/types';

export default function Select({ name, options, maxSelection = 1, control, rules }: SelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <div className="flex flex-wrap gap-2">
          {options.map(({ key, name }) => {
            return (
              <OptionBtn
                key={key}
                name={name}
                selected={isSelected(value, key)}
                onClick={(e) => {
                  handleOptionClick(e, value, key, maxSelection, onChange);
                }}
              />
            );
          })}
        </div>
      )}
    />
  );
}

function isSelected(value: number | number[] | null, key: number): boolean {
  // value가 배열일 때
  if (Array.isArray(value)) {
    return value.includes(key);
  }
  return value === key;
}

function handleOptionClick(
  e: React.MouseEvent<HTMLButtonElement>,
  value: number | number[] | null,
  key: number,
  maxSelection: number,
  onChange: (value: number | number[] | null) => void,
) {
  e.preventDefault();

  // value가 배열이 아닐 때
  if (!Array.isArray(value)) {
    onChange(value === key ? null : key);
    return;
  }

  if (value.includes(key)) {
    onChange(null);
  } else {
    const updatedValue = [...value, key];
    if (updatedValue.length > maxSelection) {
      updatedValue.shift();
    }
    onChange(updatedValue);
  }
}
