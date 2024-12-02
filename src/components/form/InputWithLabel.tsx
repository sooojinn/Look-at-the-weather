import { FieldValues, Path, RegisterOptions } from 'react-hook-form';
import Label from '@components/form/Label';
import { ReactNode, useEffect, useState } from 'react';
import PasswordToggleBtn from '@components/common/atom/PasswordToggleBtn';
import ErrorMessage from './ErrorMessage';
import InputDeleteBtn from '@components/icons/input/InputDeleteBtn';
import SearchIcon from '@components/icons/input/SearchIcon';
import { FormMethods } from '@/config/types';

interface InputWithLabelProps<T extends FieldValues> extends FormMethods<T> {
  name: Path<T>;
  type?: 'text' | 'password';
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  search?: boolean;
  hideDeleteBtn?: boolean;
  maxLength?: number;
  button?: ReactNode;
  rules?: RegisterOptions<T>;
  defaultValue?: string;
}

export default function InputWithLabel<T extends FieldValues>({
  name,
  type = 'text',
  label,
  disabled,
  placeholder,
  search,
  hideDeleteBtn,
  maxLength,
  button,
  ...formMethods
}: InputWithLabelProps<T>) {
  const {
    rules,
    register,
    setValue,
    getValues,
    defaultValue,
    formState: { errors },
  } = formMethods;
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hideDeleteBtn) return;

    const value = e.target.value;
    if (value && !showDeleteBtn) {
      setShowDeleteBtn(true);
    } else if (!value && showDeleteBtn) {
      setShowDeleteBtn(false);
    }
  };

  const handleDeleteClick = () => {
    setValue(name, '' as T[typeof name]);
  };

  const handleFocus = () => {
    if (getValues(name)) {
      setShowDeleteBtn(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDeleteBtn(false);
    }, 100);
  };

  useEffect(() => {
    if (defaultValue) setValue(name, defaultValue as T[typeof name]);
  }, [defaultValue]);

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;
  const hasError = !!errors?.[name];

  return (
    <div className="w-full flex flex-col gap-2">
      {label && <Label required={!!rules?.required}>{label}</Label>}
      <div>
        <div className="flex">
          <div className="w-full relative">
            <input
              type={inputType}
              disabled={disabled}
              autoComplete="off"
              maxLength={maxLength}
              className={`input h-12 ${search ? '!pl-8' : ''} ${hasError ? '!border-status-error' : ''} ${
                disabled ? '!text-gray !bg-background-disabled' : ''
              } focus:pr-9`}
              placeholder={placeholder}
              {...register(name, {
                ...rules,
                onChange: handleInputChange,
              })}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {search && (
              <div className="absolute left-3 bottom-1/2 transform translate-y-1/2 flex items-center">
                <SearchIcon />
              </div>
            )}
            <div className="absolute right-3 bottom-1/2 transform translate-y-1/2 flex items-center gap-5">
              {type === 'password' && !disabled && showDeleteBtn && (
                <PasswordToggleBtn onToggle={togglePasswordVisibility} isVisible={isPasswordVisible} />
              )}
              {showDeleteBtn && !hideDeleteBtn && <InputDeleteBtn onClick={handleDeleteClick} />}
            </div>
          </div>
          {button && <div className="ml-3">{button}</div>}
        </div>
        {hasError && <ErrorMessage<T> errors={errors} name={name} />}
      </div>
    </div>
  );
}
