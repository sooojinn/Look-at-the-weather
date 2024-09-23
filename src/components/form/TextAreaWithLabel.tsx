import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import Label from '@components/form/Label';
import { PostFormData } from '@/config/types';
import { useState } from 'react';
import Text from '@components/common/atom/Text';

interface TextAreaWithLabelProps {
  name: keyof PostFormData;
  label: string;
  placeholder: string;
  maxLength: number;
  register: UseFormRegister<PostFormData>;
  rules?: RegisterOptions<PostFormData, keyof PostFormData>;
  className?: string;
}

export default function TextAreaWithLabel({
  name,
  label,
  placeholder,
  maxLength,
  register,
  rules,
  className = '',
}: TextAreaWithLabelProps) {
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
  };

  return (
    <div className="relative flex flex-col gap-2">
      <Label required={!!rules?.required}>{label}</Label>
      <textarea
        className={`textarea ${className}`}
        placeholder={placeholder}
        maxLength={maxLength}
        {...register(name, rules)}
        onChange={(e) => {
          register(name, rules).onChange(e); // react-hook-form의 register 함수 호출
          handleChange(e); // 글자 수 업데이트
        }}
      />
      <div className="absolute right-3 bottom-3">
        <Text size="xs" color="lightGray">
          {charCount}/{maxLength}
        </Text>
      </div>
    </div>
  );
}
