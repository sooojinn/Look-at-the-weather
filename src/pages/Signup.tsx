import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Header from '@/components/common/Header';
import InputWithLabel from '@components/form/InputWithLabel';
import Button from '@components/common/molecules/Button';
import LocationTermsCheckBox from '@components/common/organism/LocationTermsCheckBox';
import InputStatusMessage from '@components/form/InputStatusMessage';
import useSignupStore from '@/store/signupStore';
import {
  useCheckNicknameMutation,
  useRegisterMutation,
  useSendVerificationMutation,
  useVerifyCodeMutation,
} from '@/lib/signupMutations';
import { SignupForm } from '@/config/types';

export default function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    getValues,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>();

  const {
    isEmailVerified,
    isCodeSended,
    isNicknameChecked,
    setIsCodeSended,
    setIsEmailVerified,
    setIsNicknameChecked,
  } = useSignupStore();

  const sendVerificationMutation = useSendVerificationMutation();
  const verifyCodeMutation = useVerifyCodeMutation();
  const checkNicknameMutation = useCheckNicknameMutation();
  const registerMutation = useRegisterMutation();

  const handleSendVerification = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isEmailValid = await trigger('email');
    if (!isEmailValid) return;

    const email = getValues('email');
    sendVerificationMutation.mutate(email);
  };

  const handleVerifyCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const email = getValues('email');
    const code = getValues('code');
    verifyCodeMutation.mutate({ email, code });
  };

  const handleCheckNickname = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isNicknameValid = await trigger('nickname');
    if (!isNicknameValid) return;

    const nickname = getValues('nickname');
    checkNicknameMutation.mutate(nickname);
  };

  const onSubmit = async (data: SignupForm) => {
    const { email, password, name, nickname } = data;

    if (!isEmailVerified) {
      setError('code', { message: '이메일 인증을 완료해 주세요.' });
      return;
    }
    if (!isNicknameChecked) {
      setError('nickname', { message: '닉네임 중복 확인을 해주세요.' });
      return;
    }

    registerMutation.mutate({ email, password, name, nickname, isSocial: false });
  };

  useEffect(() => {
    if (getValues('password')) trigger('password');
    if (getValues('confirmPassword')) trigger('confirmPassword');
  }, [watch('password'), watch('confirmPassword')]);

  useEffect(() => {
    setIsEmailVerified(false);
    setIsCodeSended(false);
  }, [watch('email')]);

  useEffect(() => {
    setIsNicknameChecked(false);
  }, [watch('nickname')]);

  return (
    <div className="h-screen flex flex-col">
      <Header>회원가입</Header>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between px-5 pb-10">
        <div className="h-[calc(100vh-159px)] overflow-auto scrollbar-hide pt-5 flex flex-col gap-4">
          <div>
            <InputWithLabel
              name="email"
              label="이메일"
              placeholder="(예시) abcde@naver.com"
              register={register}
              rules={{
                required: '이메일을 입력해 주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '유효한 이메일 형식이 아닙니다.',
                },
                maxLength: {
                  value: 30,
                  message: '30글자 미만으로 작성해 주세요.',
                },
              }}
              errors={errors}
              setValue={setValue}
              button={
                <Button
                  size="m"
                  width={123}
                  disabled={!watch('email') || isEmailVerified}
                  onClick={handleSendVerification}
                >
                  {isEmailVerified ? '확인 완료' : isCodeSended ? '재전송' : '인증번호 전송'}
                </Button>
              }
            />
            <InputStatusMessage status="normal" isVisible={isCodeSended}>
              인증번호가 전송되었습니다.
            </InputStatusMessage>
          </div>

          <InputWithLabel
            name="code"
            label="인증번호 확인"
            isDisabled={isEmailVerified}
            placeholder="인증번호를 입력해 주세요."
            register={register}
            rules={{
              required: '인증번호를 입력해 주세요.',
            }}
            errors={errors}
            setValue={setValue}
            button={
              <Button size="m" width={123} disabled={!watch('code') || isEmailVerified} onClick={handleVerifyCode}>
                {isEmailVerified ? '확인 완료' : '인증번호 확인'}
              </Button>
            }
          />

          <InputWithLabel
            name="password"
            type="password"
            label="비밀번호"
            placeholder="영문/숫자/특수문자 2가지 이상 조합 (8-15자)"
            register={register}
            rules={{
              required: '비밀번호를 입력해 주세요.',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*[\d\W])[A-Za-z\d\W]{8,15}$/,
                message: '8~15자의 영문,숫자,특수문자 2가지 이상 조합으로 입력해 주세요.',
              },
            }}
            errors={errors}
            setValue={setValue}
          />

          <div>
            <InputWithLabel
              name="confirmPassword"
              type="password"
              label="비밀번호 확인"
              placeholder="비밀번호를 한번 더 입력해 주세요."
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

          <InputWithLabel
            name="name"
            label="이름"
            placeholder="이름을 입력해 주세요."
            register={register}
            rules={{
              required: '이름을 입력해 주세요.',
              pattern: {
                value: /^[a-zA-Z가-힣]{1,10}$/,
                message: '한/영 10자 이내(특수문자, 공백 불가)',
              },
            }}
            errors={errors}
            setValue={setValue}
          />

          <div>
            <InputWithLabel
              name="nickname"
              label="닉네임"
              placeholder="한/영 10자 이내, 특수문자, 공백 불가"
              register={register}
              rules={{
                required: '닉네임을 입력해 주세요.',
                pattern: {
                  value: /^[a-zA-Z가-힣]{1,10}$/,
                  message: '한/영 10자 이내(특수문자, 공백 불가)의 닉네임으로 설정해 주세요.',
                },
              }}
              errors={errors}
              setValue={setValue}
              button={
                <Button
                  size="m"
                  width={90}
                  disabled={!watch('nickname') || isNicknameChecked}
                  onClick={handleCheckNickname}
                >
                  {isNicknameChecked ? '확인 완료' : '중복 확인'}
                </Button>
              }
            />
            <InputStatusMessage status="success" isVisible={isNicknameChecked}>
              사용 가능한 닉네임입니다.
            </InputStatusMessage>
          </div>
          <LocationTermsCheckBox register={register} errors={errors} isChecked={watch('terms')} />
        </div>
        <Button type="main" isSubmitting={isSubmitting}>
          가입하기
        </Button>
      </form>
    </div>
  );
}
