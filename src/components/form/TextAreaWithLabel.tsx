import { UseFormRegister } from 'react-hook-form';
import Label from '@components/form/Label';
import { PostFormData } from '@/config/types';

interface TextAreaWithLabelProps {
  id: keyof PostFormData;
  label: string;
  placeholder: string;
  register: UseFormRegister<PostFormData>;
  required?: boolean;
  className?: string;
}

export default function TextAreaWithLabel({
  id,
  label,
  placeholder,
  register,
  required = false,
  className = '',
}: TextAreaWithLabelProps) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <textarea className={`textarea ${className}`} placeholder={placeholder} {...register(id, { required })} />
    </div>
  );
}
