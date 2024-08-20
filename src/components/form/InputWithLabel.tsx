import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
import Label from '@components/form/Label';
import Text from '@components/common/atom/Text';
import ExclamationMarkIcon from '@components/icons/ExclamationMarkIcon';

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
  const errorMessages = errors?.[name]?.message;
  const errorMessageString = typeof errorMessages === 'string' ? errorMessages : '';
  const hasError = !!errorMessages;

  return (
    <div className="flex flex-col gap-2">
      <Label required={!!rules?.required}>{label}</Label>
      <div className="relative">
        <input
          type={type}
          className={`input ${hasError ? '!border-status-error' : ''}`}
          placeholder={placeholder}
          {...register(name, rules)}
        />
        {hasError && (
          <div className="absolute right-4 bottom-[14px]">
            <ExclamationMarkIcon width={20} fill="#ff4242" />
          </div>
        )}
      </div>
      {hasError && (
        <Text size="xs" color="error">
          {errorMessageString}
        </Text>
      )}
    </div>
  );
}
