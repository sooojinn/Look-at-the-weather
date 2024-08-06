import { Control, RegisterOptions } from 'react-hook-form';
import Label from './Label';
import Text from '@components/common/atom/Text';
import Select from './Select';

interface SelectWithLabelProps {
  label: string;
  description?: string;
  name: string;
  options: string[];
  rules?: RegisterOptions; // 유효성 검사 규칙
  control: Control<any>;
  maxSelection?: number;
}

export default function SelectWithLabel({
  label,
  description,
  name,
  options,
  rules,
  control,
  maxSelection,
}: SelectWithLabelProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Label required={!!rules?.required}>{label}</Label>
        {description && (
          <Text size="s" color="lightGray">
            {description}
          </Text>
        )}
      </div>
      <Select name={name} options={options} control={control} rules={rules} maxSelection={maxSelection} />
    </div>
  );
}
