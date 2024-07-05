import { useState } from 'react';
import PageTitle from '../components/common/PageTitle';

export default function Signup() {
  const [showTerms, setShowTerms] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isChecked) {
      // 이 부분에 가입 처리 로직을 추가할 수 있습니다.
      alert('가입 처리를 진행합니다.');
    } else {
      alert('약관에 동의해야 가입할 수 있습니다.');
    }
  };

  return (
    <div>
      <PageTitle title="회원가입" />
      <form className="px-5" onSubmit={handleSubmit}>
        {/* 로그인 */}
        <div>
          <label className="block mb-2 my-5 text-gray-600 font-bold">
            이메일<span className="text-red-500">*</span>
          </label>
          <div className="flex justify-between space-x-3">
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="(예시) abcde@naver.com"
            />
            <button
              type="button"
              className="rounded-lg bg-interactive-light hover:bg-primary-lightest py-3 px-4 whitespace-nowrap"
            >
              인증번호 전송
            </button>
          </div>
        </div>
        {/* 인증번호확인 */}
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            인증번호 확인<span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-3">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="인증번호를 입력해 주세요."
            />
            <button
              type="button"
              className="rounded-lg bg-interactive-light hover:bg-primary-lightest py-3 px-4 whitespace-nowrap"
            >
              인증번호 확인
            </button>
          </div>
        </div>
        {/* 비밀번호 */}
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            비밀번호<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="영문/숫자/특수문자 2가지 이상 조합 (8~15자)"
          />
        </div>
        {/* 비밀번호 확인 */}
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            비밀번호 확인<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="비밀번호를 한번 더 입력해 주세요."
          />
        </div>
        {/* 이름 */}
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            이름<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="이름(성별)을 입력해 주세요."
          />
        </div>
        {/* 닉네임 */}
        <div>
          <label className="block mb-2 my-4 text-gray-600 font-bold">
            닉네임<span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-3">
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="한/영 10자 이내,특수문자,공백 불가"
            />
            <button
              type="button"
              className="rounded-lg bg-interactive-light hover:bg-primary-lightest py-3 px-4 whitespace-nowrap"
            >
              중복 확인
            </button>
          </div>
        </div>
        {/* 위치 정보 이용약관 */}
        <div className="flex items-center my-4 cursor-pointer">
          <label htmlFor="terms" className="cursor-pointer select-none text-gray-600 flex items-center">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 border border-gray-300 rounded"
              checked={isChecked}
              onChange={handleCheckboxChange}
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
