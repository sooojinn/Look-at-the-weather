import { FieldValues } from 'react-hook-form';
import Label from '@/components/form/atom/Label';
import Input, { InputProps } from './Input';

interface InputWithLabelProps<T extends FieldValues> extends InputProps<T> {
  label: string;
}

export default function InputWithLabel<T extends FieldValues>({ label, ...props }: InputWithLabelProps<T>) {
  const { rules } = props;
  const required = !!rules?.required;

  return (
    <div className="w-full flex flex-col gap-2">
      {label && <Label required={required}>{label}</Label>}
      <Input<T> {...props} />
    </div>
  );
}
