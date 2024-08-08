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
  // value가 배열(다중선택)일 때
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

  // 다중선택이 아닐 때
  if (maxSelection === 1) {
    onChange(value === key ? null : key);
    return;
  }

  // 다중선택일 때
  if (maxSelection > 1 && Array.isArray(value)) {
    if (value.includes(key)) {
      const newValue = value.filter((v) => v !== key);
      onChange(newValue);
    } else {
      const newValue = [...value, key];
      if (newValue.length > maxSelection) {
        newValue.shift();
      }
      onChange(newValue);
    }
  }
}
