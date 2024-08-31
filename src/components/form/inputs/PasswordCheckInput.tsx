import { useEffect } from 'react';
import InputStatusMessage from '../InputStatusMessage';
import InputWithLabel from '../InputWithLabel';
import { FormMethods } from '@/config/types';

export default function PasswordCheckInput({
  register,
  setValue,
  watch,
  getValues,
  trigger,
  formState: { errors },
}: FormMethods) {
  useEffect(() => {
    if (getValues('confirmPassword')) trigger('confirmPassword');
  }, [watch('password'), watch('confirmPassword')]);

  return (
    <div>
      <InputWithLabel
        name="confirmPassword"
        type="password"
        label="비밀번호 확인"
        placeholder="비밀번호를 한 번 더 입력해 주세요."
        register={register}
        rules={{
          required: '비밀번호를 다시 입력해 주세요.',
          validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다',
        }}
        errors={errors}
        setValue={setValue}
      />
      <InputStatusMessage
        status="success"
        isVisible={!!watch('confirmPassword') && watch('confirmPassword') === watch('password')}
      >
        비밀번호가 일치합니다.
      </InputStatusMessage>
    </div>
  );
}
