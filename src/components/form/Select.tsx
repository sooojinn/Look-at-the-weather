import { Control, Controller, RegisterOptions } from 'react-hook-form';
import OptionBtn from './OptionBtn';

interface SelectProps {
  name: string;
  options: string[];
  maxSelection?: number;
  control: Control<any>;
  rules?: RegisterOptions; // 유효성 검사 규칙
}

export default function Select({ name, options, maxSelection = 1, control, rules }: SelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <OptionBtn
              key={option}
              option={option}
              selected={value.includes(option)}
              onClick={(e) => {
                e.preventDefault();
                // 현재 선택된 항목이 option인지 확인
                if (value.includes(option)) {
                  // 선택된 항목을 제거
                  onChange(value.filter((v: string) => v !== option));
                } else {
                  let updatedValue;
                  if (maxSelection > 1) {
                    updatedValue = [...value, option];
                    if (updatedValue.length > maxSelection) {
                      updatedValue.shift();
                    }
                  } else {
                    updatedValue = option;
                  }
                  onChange(updatedValue);
                }
              }}
            />
          ))}
        </div>
      )}
    />
  );
}
