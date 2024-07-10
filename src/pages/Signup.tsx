import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import PageTitle from '../components/common/PageTitle';
import { BASEURL } from '../constants/constants';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const [showTerms, setShowTerms] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const navigate = useNavigate();

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // 이메일 발송
  const handleSendVerification = async () => {
    const email = getValues('email');
    try {
      const response = await axios.post(`${BASEURL}/api/v1/email/send-verification`, { email });
      console.log(response);
      alert('이메일에 인증코드가 발송되었습니다');
    } catch (error) {
      console.log(error);
    }
  };

  // 이메일 인증코드 확인
  const handleVerifyCode = async () => {
    const email = getValues('email');
    const code = getValues('code');
    try {
      const response = await axios.post(`${BASEURL}/api/v1/email/verify-code`, { email, code });
      console.log(response);
      alert('인증이 완료되었습니다');
      setIsEmailVerified(true);
      clearErrors('code'); // 인증 성공 시 오류 메시지 제거
    } catch (error) {
      setError('code', { message: '인증번호가 올바르지 않습니다.' });
    }
  };

  // 닉네임 중복확인
  const handleCheckNickname = async () => {
    const nickname = getValues('nickname'); // react-hook-form에서 닉네임 값을 가져오는 예시입니다.

    try {
      const response = await axios.get(`${BASEURL}/api/v1/users/nickname-check/${nickname}`);
      console.log(response.data); // 서버로부터 받은 응답 데이터를 출력합니다.

      if (!response.data.isAvailable) {
        alert('이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.');
      } else {
        alert('사용 가능한 닉네임입니다');
        setIsNicknameChecked(true);
      }
    } catch (error) {
      console.error('닉네임 중복 검사 오류:', error);
      alert('닉네임 중복 여부를 확인하는 중 오류가 발생했습니다.');
    }
  };

  // 회원가입
  const onSubmit = async (data: any) => {
    if (!isEmailVerified) {
      setError('email', { message: '이메일 인증을 완료해주세요' });
      return;
    }
    if (!isNicknameChecked) {
      setError('nickname', { message: '닉네임 중복 확인을 해주세요' });
      return;
    }

    try {
      const response = await axios.post(`${BASEURL}/api/v1/users/register`, data);
      console.log(response);
      alert('가입 처리를 진행합니다.');
      reset(); // 폼 초기화
      setIsEmailVerified(false); // 이메일 인증 상태 초기화
      setIsNicknameChecked(false); // 닉네임 확인 상태 초기화
      navigate('/');
    } catch (error) {
      setError('submit', { message: '가입 처리 중 오류가 발생했습니다.' });
    }
  };

  // 이메일 값 변경 시 이메일 인증 초기화
  useEffect(() => {
    setIsEmailVerified(false);
  }, [watch('email')]);

  // 닉네임 값 변경 시 닉네임 확인 초기화
  useEffect(() => {
    setIsNicknameChecked(false);
  }, [watch('nickname')]);

  return (
    <div>
      <PageTitle title="회원가입" />
      <form className="px-5" onSubmit={handleSubmit(onSubmit)}>
        {/* 이메일 */}
        <div>
          <label className="block mb-2 my-5 text-gray-600 font-bold">
            이메일<span className="text-red-500">*</span>
          </label>
          <div className="flex justify-between space-x-3">
            <input
              type="email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="(예시) abcde@naver.com"
              {...register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식에 맞춰 작성해주세요',
                },
                maxLength: {
                  value: 30,
                  message: '30글자 미만 작성해주세요',
                },
              })}
            />
            <button
              type="button"
              className="rounded-lg bg-interactive-light hover:text-white hover:bg-primary-lightest py-3 px-4 whitespace-nowrap"
              onClick={handleSendVerification}
            >
              인증번호 전송
            </button>
          </div>
          {errors.email && <p className="text-red-500">{errors.email.message?.toString()}</p>}
        </div>
        {/* 인증번호 확인 */}
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            인증번호 확인<span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-3">
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.code ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="인증번호를 입력해 주세요."
              {...register('code', { required: '인증번호를 입력해주세요' })}
            />
            <button
              type="button"
              className="rounded-lg bg-interactive-light hover:text-white hover:bg-primary-lightest py-3 px-4 whitespace-nowrap"
              onClick={handleVerifyCode}
            >
              인증번호 확인
            </button>
          </div>
          {errors.code && <p className="text-red-500">{errors.code.message?.toString()}</p>}
        </div>
        {/* 비밀번호 */}
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            비밀번호<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="영문/숫자/특수문자 포함하세요. (8~16자)"
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/])[A-Za-z\d~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]{8,16}$/,
                message: '영문/숫자/특수문자 조합으로 8~16자 이내여야 합니다.',
              },
            })}
          />
          {errors.password && <p className="text-red-500">{errors.password.message?.toString()}</p>}
        </div>
        {/* 비밀번호 확인 */}
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            비밀번호 확인<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="비밀번호를 한번 더 입력해 주세요."
            {...register('confirmPassword', {
              required: '비밀번호를 다시 입력해주세요',
              validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다',
            })}
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message?.toString()}</p>}
          {!errors.confirmPassword && watch('confirmPassword') && (
            <p className="text-green-500">비밀번호가 일치합니다.</p>
          )}
        </div>
        {/* 이름 */}
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            이름<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="이름을 입력해 주세요."
            {...register('name', { required: '이름을 입력해주세요' })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message?.toString()}</p>}
        </div>
        {/* 닉네임 */}
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            닉네임<span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-3">
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.nickname ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="한/영 10자 이내, 특수문자, 공백 불가"
              {...register('nickname', {
                required: '닉네임을 입력해주세요',
                pattern: {
                  value: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/,
                  message: '한글, 영문자, 숫자 조합으로 2~10자 이내여야 합니다.',
                },
              })}
            />
            <button
              type="button"
              className="rounded-lg bg-interactive-light hover:bg-primary-lightest hover:text-white py-3 px-4 whitespace-nowrap"
              onClick={handleCheckNickname}
            >
              중복 확인
            </button>
          </div>
          {errors.nickname && <p className="text-red-500">{errors.nickname.message?.toString()}</p>}
        </div>
        {/* 위치 정보 이용약관 */}
        <div className="flex items-center my-4 cursor-pointer">
          <label htmlFor="terms" className="cursor-pointer select-none text-gray-600 flex items-center">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 border border-gray-300 rounded"
              checked={isChecked}
              onClick={handleCheckboxChange}
              {...register('terms', { required: '위치 정보 이용약관에 동의해주세요' })}
            />
            위치 정보 이용약관(필수)
          </label>
          <svg
            onClick={toggleTerms}
            className={`ml-2 h-4 w-4 ${showTerms ? 'transform rotate-180' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.293 5.293a1 1 0 011.414 0L10 10.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {showTerms && (
          <div className="p-4 mb-10 bg-gray-100 border border-gray-300 rounded-lg">위치 정보 이용약관 내용</div>
        )}
        <button
          type="submit"
          className="font-bold w-full bg-interactive-light hover:bg-primary-lightest hover:text-white rounded-lg py-3 px-4 whitespace-nowrap"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
