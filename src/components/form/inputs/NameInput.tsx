import { FormMethods } from '@/config/types';
import InputWithLabel from '../InputWithLabel';

interface NameInputProps extends FormMethods {
  shouldValidate?: boolean;
  isDisabled?: boolean;
}

export default function NameInput({
  shouldValidate,
  isDisabled,
  register,
  setValue,
  formState: { errors },
}: NameInputProps) {
  return (
    <InputWithLabel
      name="name"
      label="이름"
      placeholder="이름(실명)을 입력해 주세요."
      isDisabled={isDisabled}
      register={register}
      rules={{
        required: '이름을 입력해 주세요.',
        ...(shouldValidate && {
          pattern: {
            value: /^[a-zA-Z가-힣]{1,10}$/,
            message: '한/영 10자 이내(특수문자, 공백 불가)로 입력해 주세요.',
          },
        }),
      }}
      maxLength={10}
      errors={errors}
      setValue={setValue}
    />
  );
}
