import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
import Label from '@components/form/Label';
import Text from '@components/common/atom/Text';
import ExclamationMarkIcon from '@components/icons/ExclamationMarkIcon';
import { useState } from 'react';
import PasswordToggleBtn from '@components/icons/PasswordToggleBtn';

interface InputWithLabelProps {
  name: any;
  type?: 'text' | 'password';
  label: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions<any, any>;
  errors?: FieldErrors<any>;
}

export default function InputWithLabel({
  name,
  type = 'text',
  label,
  placeholder,
  register,
  rules,
  errors,
}: InputWithLabelProps) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordVisible(!isPasswordVisible);
  };

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;
  const errorMessages = errors?.[name]?.message;
  const errorMessageString = typeof errorMessages === 'string' ? errorMessages : '';
  const hasError = !!errorMessages;

  return (
    <div className="flex flex-col gap-2">
      <Label required={!!rules?.required}>{label}</Label>
      <div className="relative">
        <input
          type={inputType}
          className={`input ${hasError ? '!border-status-error' : ''}`}
          placeholder={placeholder}
          {...register(name, rules)}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center h-full">
          {hasError && <ExclamationMarkIcon width={20} fill="#ff4242" />}
          {!hasError && type === 'password' && (
            <PasswordToggleBtn onToggle={togglePasswordVisibility} isVisible={isPasswordVisible} />
          )}
        </div>
      </div>
      {hasError && (
        <Text size="xs" color="error">
          {errorMessageString}
        </Text>
      )}
    </div>
  );
}
