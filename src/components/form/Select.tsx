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
                  // 최대 선택 개수를 초과하지 않도록 새로운 항목 추가
                  const updatedValue = [...value, option];
                  // 새로운 값이 maxSelection을 초과하면 가장 오래된 항목 제거
                  if (updatedValue.length > maxSelection) {
                    updatedValue.shift();
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
