import { ReactNode, useEffect } from 'react';
import { FieldValues, Path, RegisterOptions, UseFormReturn } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import StyledInput from './inputs/StyledInput';
import InputDeleteBtn from './InputDeleteBtn';
import useInputDelete from '@/hooks/useInputDelete';

export interface InputProps<T extends FieldValues>
  extends UseFormReturn<T>,
    React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  search?: boolean;
  hideDeleteBtn?: boolean;
  button?: ReactNode;
  rules?: RegisterOptions<T>;
  defaultValue?: T[Path<T>];
}

export default function Input<T extends FieldValues>({
  name,
  type = 'text',
  disabled,
  placeholder,
  search,
  hideDeleteBtn,
  maxLength,
  button,
  defaultValue,
  ...formMethods
}: InputProps<T>) {
  const {
    rules,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = formMethods;

  const { showDeleteBtn, handleInputChange, handleDeleteClick, handleFocus, handleBlur } = useInputDelete({
    name,
    setValue,
    getValues,
    hideDeleteBtn,
  });

  useEffect(() => {
    if (defaultValue) setValue(name, defaultValue);
  }, [defaultValue, setValue, name]);

  const hasError = !!errors?.[name];

  return (
    <div className="flex flex-col gap-1">
      <div className="flex">
        <div className="w-full relative">
          <StyledInput
            type={type}
            maxLength={maxLength}
            placeholder={placeholder}
            disabled={!!disabled}
            hasError={hasError}
            search={!!search}
            {...register(name, {
              ...rules,
              onChange: handleInputChange,
            })}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <div
            className={`absolute bottom-1/2 ${type === 'password' ? 'right-12' : 'right-3'} transform translate-y-1/2 flex items-center gap-5`}
          >
            {showDeleteBtn && !hideDeleteBtn && <InputDeleteBtn onClick={handleDeleteClick} />}
          </div>
        </div>
        {button && <div className="ml-3">{button}</div>}
      </div>
      {hasError && <ErrorMessage<T> errors={errors} name={name} />}
    </div>
  );
}
