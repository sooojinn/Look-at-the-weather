import { useState } from 'react';
import { Link } from 'react-router-dom';

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
      <div className="flex justify-between border-b-2 px-5 py-4">
        <Link to="/">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z" fill="#171719" />
          </svg>
        </Link>
        <div>회원가입</div>
        <div className="w-6 h-6"></div>
      </div>
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
              placeholder="(예시) abcde@naver.com"
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
            placeholder="(예시) abcde@naver.com"
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
            placeholder="(예시) abcde@naver.com"
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
            placeholder="(예시) abcde@naver.com"
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
              placeholder="(예시) abcde@naver.com"
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
          className="w-full bg-interactive-light hover:bg-primary-lightest hover:text-white rounded-lg py-3 px-4 whitespace-nowrap"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
