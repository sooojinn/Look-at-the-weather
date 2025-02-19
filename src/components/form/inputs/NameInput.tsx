import InputWithLabel from '../InputWithLabel';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface NameInputProps<T extends FieldValues> extends UseFormReturn<T> {
  shouldValidate?: boolean;
  disabled?: boolean;
  defaultValue?: T[Path<T>];
}

export default function NameInput<T extends FieldValues>({
  shouldValidate,
  disabled,
  defaultValue,
  ...formMethods
}: NameInputProps<T>) {
  return (
    <InputWithLabel<T>
      name={'name' as Path<T>}
      label="이름"
      placeholder="이름(실명)을 입력해 주세요."
      disabled={disabled}
      rules={{
        required: !disabled ? '이름을 입력해 주세요.' : false,
        ...(shouldValidate && {
          pattern: {
            value: /^[a-zA-Z가-힣]{1,10}$/,
            message: '한/영 10자 이내(특수문자, 공백 불가)로 입력해 주세요.',
          },
        }),
      }}
      maxLength={10}
      defaultValue={defaultValue}
      {...formMethods}
    />
  );
}
