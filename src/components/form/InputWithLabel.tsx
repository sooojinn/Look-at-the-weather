import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
import Label from '@components/form/Label';
import ExclamationMarkIcon from '@components/icons/ExclamationMarkIcon';
import { ReactNode, useState } from 'react';
import PasswordToggleBtn from '@components/icons/PasswordToggleBtn';
import ErrorMessage from './ErrorMessage';
import InputDeleteBtn from '@components/icons/InputDeleteBtn';

interface InputWithLabelProps {
  name: string;
  type?: 'text' | 'password';
  label: string;
  isDisabled?: boolean;
  placeholder?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions<any, any>;
  errors: FieldErrors<any>;
  button?: ReactNode;
}

export default function InputWithLabel({
  name,
  type = 'text',
  label,
  isDisabled = false,
  placeholder,
  register,
  rules,
  errors,
  button,
}: InputWithLabelProps) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            className={`input ${hasError ? '!border-status-error' : ''} ${
              isDisabled ? '!text-lightGray !bg-white' : ''
            }`}
            placeholder={placeholder}
            {...register(name, {
              ...rules,
              onChange: handleInputChange,
            })}
            value={inputValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <div className="absolute right-4 bottom-1/2 transform translate-y-1/2 flex items-center h-full">
            {hasError && <ExclamationMarkIcon width={20} fill="#ff4242" />}
            {!hasError && type === 'password' && (
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
