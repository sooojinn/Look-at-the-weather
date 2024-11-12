import useSignupStore from '@/store/signupStore';
import InputWithLabel from '../InputWithLabel';
import Button from '@components/common/molecules/Button';
import { useVerifyCodeMutation } from '@/lib/signupMutations';
import { FormMethods } from '@/config/types';
import { FieldValues, Path, useWatch } from 'react-hook-form';

export default function CodeInput<T extends FieldValues>({ ...formMethods }: FormMethods<T>) {
  const { setError, clearErrors, getValues, control } = formMethods;
  const isEmailVerified = useSignupStore((state) => state.isEmailVerified);
  const isCodeSended = useSignupStore((state) => state.isCodeSended);
  const { mutate: verifyCodeMutation, isPending: isVerifyingCode } = useVerifyCodeMutation<T>(setError, clearErrors);

  // useWatch를 사용하여 특정 필드만 관찰
  const codeValue = useWatch({
    control,
    name: 'code' as Path<T>,
  });

  const handleVerifyCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const email = getValues('email' as Path<T>);
    const code = getValues('code' as Path<T>);
    verifyCodeMutation({ email, code });
  };

  return (
    <InputWithLabel<T>
      name={'code' as Path<T>}
      label="인증번호 확인"
      disabled={isEmailVerified}
      placeholder="인증번호를 입력해 주세요."
      rules={{
        required: '인증번호를 입력해 주세요.',
        validate: () => isEmailVerified || '이메일 인증을 완료해 주세요.',
      }}
      {...formMethods}
      button={
        <Button
          size="m"
          width={123}
          disabled={!isCodeSended || !codeValue || isEmailVerified}
          isSubmitting={isVerifyingCode}
          onClick={handleVerifyCode}
        >
          {isEmailVerified ? '확인 완료' : '인증번호 확인'}
        </Button>
      }
    />
  );
}
