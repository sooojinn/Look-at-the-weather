import { forwardRef, useState } from 'react';
import SearchIcon from '@/components/icons/input/SearchIcon';
import PasswordToggleBtn from '../atom/PasswordToggleBtn';

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled: boolean;
  hasError: boolean;
  search: boolean;
}

const StyledInput = forwardRef<HTMLInputElement, StyledInputProps>(
  ({ type, disabled, hasError, search, onFocus, onBlur, ...props }, ref) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isPwToggleBtnVisible, setIsPwToggleBtnVisible] = useState(false);

    const togglePasswordVisibility = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setPasswordVisible(!isPasswordVisible);
    };

    const handleFocus = () => {
      if (type !== 'password') return;
      setIsPwToggleBtnVisible(true);
    };

    const handleBlur = () => {
      if (type !== 'password') return;
      setIsPwToggleBtnVisible(false);
    };

    const inputType = type === 'password' && isPasswordVisible ? 'text' : type;
    const showPwToggleBtn = type === 'password' && !disabled && isPwToggleBtnVisible;

    return (
      <div className="w-full relative">
        <input
          ref={ref}
          type={inputType}
          disabled={disabled}
          autoComplete="off"
          className={`input h-12 ${search ? '!pl-8' : ''} ${hasError ? '!border-status-error' : ''} ${
            disabled ? '!text-gray !bg-background-disabled' : ''
          } focus:pr-9`}
          onFocus={(e) => {
            onFocus?.(e);
            handleFocus();
          }}
          onBlur={(e) => {
            onBlur?.(e);
            handleBlur();
          }}
          {...props}
        />
        {search && (
          <div className="absolute left-3 bottom-1/2 transform translate-y-1/2 flex items-center">
            <SearchIcon />
          </div>
        )}
        <div className="absolute right-3 bottom-1/2 transform translate-y-1/2">
          {showPwToggleBtn && <PasswordToggleBtn onClick={togglePasswordVisibility} isVisible={isPasswordVisible} />}
        </div>
      </div>
    );
  },
);

StyledInput.displayName = 'StyledInput';

export default StyledInput;
