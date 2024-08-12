import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import Label from '@components/form/Label';
import { PostFormData } from '@/config/types';

interface TextAreaWithLabelProps {
  name: keyof PostFormData;
  label: string;
  placeholder: string;
  register: UseFormRegister<PostFormData>;
  rules?: RegisterOptions<PostFormData, keyof PostFormData>;
  className?: string;
}

export default function TextAreaWithLabel({
  name,
  label,
  placeholder,
  register,
  rules,
  className = '',
}: TextAreaWithLabelProps) {
  return (
    <div>
      <Label required={!!rules?.required}>{label}</Label>
      <textarea className={`textarea ${className}`} placeholder={placeholder} {...register(name, rules)} />
    </div>
  );
}
