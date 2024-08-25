import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Header from '@/components/common/Header';
import { BASEURL } from '@/config/constants';
import { useNavigate } from 'react-router-dom';
import InputWithLabel from '@components/form/InputWithLabel';
import Button from '@components/common/molecules/Button';
import LocationTermsCheckBox from '@components/common/organism/LocationTermsCheckBox';
import InputStatusMessage from '@components/form/InputStatusMessage';
import { showToast } from '@components/common/molecules/ToastProvider';

export default function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const navigate = useNavigate();

  // 이메일 인증번호 전송
  const handleSendVerification = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 이메일 필드의 유효성 검사를 수동으로 실행
    const isEmailValid = await trigger('email');
    if (!isEmailValid) return;

    const email = getValues('email');
    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/email/send-verification`,
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.data.success) setIsCodeSended(true);
    } catch (error) {
      console.log('이메일 인증번호 전송 오류: ', error);
    }
  };

  // 이메일 인증코드 확인
  const handleVerifyCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const email = getValues('email');
    const code = getValues('code');
    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/email/verify-code`,
        { email, code },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.data.success) {
        setIsEmailVerified(true);
        setValue('checkEmail', true);
        clearErrors('code'); // 인증 성공 시 오류 메시지 제거
      }
    } catch (error) {
      setError('code', { message: '인증번호가 올바르지 않습니다.' });
    }
  };

  // 닉네임 중복확인
  const handleCheckNickname = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 닉네임 필드의 유효성 검사를 수동으로 실행
    const isEmailValid = await trigger('nickname');
    if (!isEmailValid) return;

    const nickname = getValues('nickname');

    try {
      const response = await axios.get(`${BASEURL}/api/v1/users/nickname-check/${nickname}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);

      if (!response.data.isAvailable) {
        setError('nickname', { message: '이미 사용 중인 닉네임입니다.' });
      } else {
        setIsNicknameChecked(true);
      }
    } catch (error) {
      console.error('닉네임 중복 검사 오류:', error);
    }
  };

  // 회원가입
  const onSubmit = async (data: any) => {
    const { email, password, name, nickname } = data;

    if (!isEmailVerified) {
      setError('code', { message: '이메일 인증을 완료해주세요' });
      return;
    }
    if (!isNicknameChecked) {
      setError('nickname', { message: '닉네임 중복 확인을 해주세요' });
      return;
    }

    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/users/register`,
        { email, password, name, nickname, isSocial: false },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        navigate('/');
        showToast('회원가입에 성공했습니다.');
      }
    } catch (error) {
      console.error(error);
      showToast('회원가입에 실패했습니다.');
    }
  };

  // 이메일 값 변경 시 이메일 인증 여부 및 인증 코드 전송 여부 초기화
  useEffect(() => {
    setIsEmailVerified(false);
    setIsCodeSended(false);
  }, [watch('email')]);

  // 닉네임 값 변경 시 닉네임 확인 초기화
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
                  message: '30글자 미만으로 작성해주세요',
                },
              }}
              errors={errors}
              setValue={setValue}
              button={
                <Button size="m" width={123} disabled={!watch('email')} onClick={handleSendVerification}>
                  {isCodeSended ? '재전송' : '인증번호 전송'}
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
            rules={{ required: '인증번호를 입력해 주세요.' }}
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
            trigger={trigger}
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
              trigger={trigger}
              setValue={setValue}
            />
            <InputStatusMessage
              status="success"
              isVisible={watch('confirmPassword') && watch('confirmPassword') === watch('password')}
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
                  value: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/,
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
          <LocationTermsCheckBox register={register} errors={errors} clearErrors={clearErrors} />
        </div>
        <Button type="main">가입하기</Button>
      </form>
    </div>
  );
}
