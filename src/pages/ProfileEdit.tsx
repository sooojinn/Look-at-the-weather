import Header from '@/components/common/Header';

import { useForm } from 'react-hook-form';
import Text from '@components/common/atom/Text';
import InputWithLabel from '@components/form/InputWithLabel';

export default function ProfileEdit() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <Header>개인정보 수정</Header>
      <form className="flex flex-col px-5 mb-[147px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mt-5">
          <div>
            <InputWithLabel
              label="이메일"
              name="email"
              register={register}
              rules={{ required: '이메일을 입력해 주세요.' }}
              placeholder="이메일"
              errors={errors}
              setValue={setValue}
              isDisabled={true}
            ></InputWithLabel>
          </div>
          <div>
            <InputWithLabel
              label="비밀번호"
              name="password"
              register={register}
              rules={{
                required: '비밀번호를 입력해 주세요.',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*[\d\W])[A-Za-z\d\W]{8,15}$/,
                  message: '8~15자의 영문,숫자,특수문자 2가지 이상 조합으로 입력해 주세요.',
                },
              }}
              placeholder="영문/숫자/특수문자 2가지 이상 조합 (8~10자)"
              errors={errors}
              type="password"
              setValue={setValue}
            ></InputWithLabel>
          </div>
          <div>
            <InputWithLabel
              label="비밀번호 확인"
              name="confirmPassword"
              register={register}
              rules={{
                required: '비밀번호를 다시 입력해 주세요.',
                validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다',
              }}
              placeholder="비밀번호를 한번 더 입력해 주세요."
              errors={errors}
              type="password"
              setValue={setValue}
            ></InputWithLabel>
          </div>
          <div>
            <InputWithLabel
              label="이름"
              name="name"
              rules={{ required: '이름을 입력해 주세요.' }}
              register={register}
              errors={errors}
              setValue={setValue}
              isDisabled={true}
            ></InputWithLabel>
          </div>
          <div>
            <div className="flex row items-end gap-2.5">
              <div className="w-full">
                <InputWithLabel
                  label="닉네임"
                  name="nickname"
                  register={register}
                  rules={{ required: '닉네임을 입력해 주세요.' }}
                  placeholder="한/영 10자 이내,특수문자,공백 불가"
                  errors={errors}
                  setValue={setValue}
                  isDisabled={false}
                ></InputWithLabel>
              </div>
              <div>
                <button type="button" className="w-[91px] bg-primary-main rounded-lg px-4 py-3">
                  <Text color="white" weight="bold" size="l">
                    중복확인
                  </Text>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="flex row mt-auto mb-10 mx-5">
        <button type="submit" className="w-full bg-primary-main rounded-lg py-3 px-4">
          <Text color="white" size="l" weight="bold">
            수정하기
          </Text>
        </button>
      </div>
    </div>
  );
}
