import Button from '@components/common/molecules/Button';
import InputWithLabel from '../InputWithLabel';
import InputStatusMessage from '../InputStatusMessage';
import useSignupStore from '@/store/signupStore';
import { useSendVerificationMutation } from '@/lib/signupMutations';
import { useEffect } from 'react';
import { FieldValues, Path, UseFormReturn, useWatch } from 'react-hook-form';

interface EmailInputProps<T extends FieldValues> extends UseFormReturn<T> {
  shouldValidate?: boolean;
  disabled?: boolean;
  defaultValue?: T[Path<T>];
}

export default function EmailInput<T extends FieldValues>({
  shouldValidate,
  disabled,
  defaultValue,
  ...formMethods
}: EmailInputProps<T>) {
  const { setError, trigger, control } = formMethods;
  const isEmailVerified = useSignupStore((state) => state.isEmailVerified);
  const isCodeSended = useSignupStore((state) => state.isCodeSended);
  const setIsEmailVerified = useSignupStore((state) => state.setIsEmailVerified);
  const setIsCodeSended = useSignupStore((state) => state.setIsCodeSended);

  const { mutate: sendVerificationMutation, isPending: isCodeSending } = useSendVerificationMutation<T>(setError);

  // useWatch를 사용하여 특정 필드만 관찰
  const emailValue = useWatch({
    control,
    name: 'email' as Path<T>,
  });

  const handleSendVerification = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isEmailValid = await trigger('email' as Path<T>);
    if (!isEmailValid) return;

    sendVerificationMutation(emailValue);
  };

  useEffect(() => {
    // 이메일이 변경되고, 이전에 코드가 전송된 상태일 때만 실행
    if (emailValue && isCodeSended) {
      setIsEmailVerified(false);
      setIsCodeSended(false);
    }

    return () => {
      if (isCodeSended || isEmailVerified) {
        setIsEmailVerified(false);
        setIsCodeSended(false);
      }
    };
  }, [emailValue]); // 필요한 의존성만 포함

  return (
    <div>
      <InputWithLabel<T>
        name={'email' as Path<T>}
        label="이메일"
        placeholder="(예시) abcde@naver.com"
        disabled={disabled}
        rules={{
          required: !disabled ? '이메일을 입력해 주세요.' : false,
          ...(shouldValidate && {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '유효한 이메일 형식이 아닙니다.',
            },
          }),
        }}
        maxLength={30}
        defaultValue={defaultValue}
        {...formMethods}
        button={
          shouldValidate && (
            <Button
              size="m"
              width={123}
              disabled={!emailValue || isEmailVerified}
              isSubmitting={isCodeSending}
              onClick={handleSendVerification}
            >
              {isEmailVerified ? '확인 완료' : isCodeSending ? '전송 중' : isCodeSended ? '재전송' : '인증번호 전송'}
            </Button>
          )
        }
      />
      <InputStatusMessage status="normal" isVisible={isCodeSended}>
        인증번호가 전송되었습니다.
      </InputStatusMessage>
    </div>
  );
}
