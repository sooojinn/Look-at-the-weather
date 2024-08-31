import Button from '@components/common/molecules/Button';
import InputWithLabel from '../InputWithLabel';
import InputStatusMessage from '../InputStatusMessage';
import useSignupStore from '@/store/signupStore';
import { useSendVerificationMutation } from '@/lib/signupMutations';
import { useEffect } from 'react';
import { FormMethods } from '@/config/types';

interface EmailInputProps extends FormMethods {
  shouldValidate?: boolean;
}

export default function EmailInput({
  shouldValidate,
  register,
  setValue,
  setError,
  trigger,
  getValues,
  watch,
  formState: { errors },
}: EmailInputProps) {
  const { isEmailVerified, isCodeSended, setIsEmailVerified, setIsCodeSended } = useSignupStore();
  const { mutate: sendVerificationMutation, isPending: isCodeSending } = useSendVerificationMutation(setError);

  const handleSendVerification = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isEmailValid = await trigger('email');
    if (!isEmailValid) return;

    const email = getValues('email');
    sendVerificationMutation(email);
  };

  useEffect(() => {
    setIsEmailVerified(false);
    setIsCodeSended(false);
  }, [watch('email')]);

  return (
    <div>
      <InputWithLabel
        name="email"
        label="이메일"
        placeholder="(예시) abcde@naver.com"
        rules={{
          required: '이메일을 입력해 주세요.',
          ...(shouldValidate && {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '유효한 이메일 형식이 아닙니다.',
            },
          }),
        }}
        maxLength={30}
        register={register}
        setValue={setValue}
        errors={errors}
        button={
          shouldValidate && (
            <Button
              size="m"
              width={123}
              disabled={!watch('email') || isEmailVerified}
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
