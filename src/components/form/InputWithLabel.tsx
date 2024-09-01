import { FieldErrors, RegisterOptions, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import Label from '@components/form/Label';
import { ReactNode, useState } from 'react';
import PasswordToggleBtn from '@components/icons/PasswordToggleBtn';
import ErrorMessage from './ErrorMessage';
import InputDeleteBtn from '@components/icons/InputDeleteBtn';
import { AuthFormName } from '@/config/types';

interface InputWithLabelProps {
  name: AuthFormName;
  type?: 'text' | 'password';
  label: string;
  isDisabled?: boolean;
  placeholder?: string;
  rules?: RegisterOptions<any, any>;
  maxLength?: number;
  button?: ReactNode;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}

export default function InputWithLabel({
  name,
  type = 'text',
  label,
  isDisabled,
  placeholder,
  rules,
  maxLength,
  button,
  register,
  setValue,
  errors,
}: InputWithLabelProps) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      setShowDeleteBtn(true);
    } else {
      setShowDeleteBtn(false);
    }
  };

  const handleDeleteClick = () => {
    setInputValue('');
    setShowDeleteBtn(false);
    setValue(name, '');
  };

  const handleFocus = () => {
    if (inputValue) {
      setShowDeleteBtn(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDeleteBtn(false); // 포커스 아웃 시 삭제 버튼 숨김 (클릭 이벤트가 먼저 처리되도록 setTimeout 사용)
    }, 0);
  };

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;
  const hasError = !!errors?.[name];

  return (
    <div className="w-full flex flex-col">
      <Label required={!!rules?.required}>{label}</Label>
      <div className="flex mt-2">
        <div className="w-full relative">
          <input
            type={inputType}
            disabled={isDisabled}
            autoComplete="off"
            maxLength={maxLength}
            className={`input h-12 ${hasError ? '!border-status-error' : ''} ${
              isDisabled ? '!text-lightGray !bg-interactive-disabled' : ''
            } focus:pr-9`}
            placeholder={placeholder}
            {...register(name, {
              ...rules,
              onChange: handleInputChange,
            })}
            value={inputValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <div className="absolute right-3 bottom-1/2 transform translate-y-1/2 flex items-center">
            {type === 'password' && (
              <PasswordToggleBtn onToggle={togglePasswordVisibility} isVisible={isPasswordVisible} />
            )}
            {!hasError && type !== 'password' && showDeleteBtn && <InputDeleteBtn onClick={handleDeleteClick} />}
          </div>
        </div>
        {button && <div className="ml-3">{button}</div>}
      </div>
      {hasError && <ErrorMessage errors={errors} name={name} />}
    </div>
  );
}
