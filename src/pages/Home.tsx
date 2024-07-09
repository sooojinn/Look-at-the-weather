import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { BASEURL } from '../constants/constants';
import axios from 'axios';
import Cookies from 'js-cookie';
import FooterNavi from '../components/common/FooterNavi';

export default function Home() {
  const { register, handleSubmit } = useForm();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    } else {
      setShowLoginForm(true);
    }
  }, []);

  const handleLogin = async (data: any) => {
    try {
      const response = await axios.post(`${BASEURL}/api/v1/auth/login`, data);
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);
      console.log(data);
      setIsLoggedIn(true);
      setShowLoginForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md m-auto min-h-screen flex flex-col items-center justify-start  relative overflow-hidden">
      {/* 로고와 날씨 정보 */}
      <div className="w-full text-3xl font-bold mt-6 text-center absolute top-0 left-0 right-0 bg-gray-100 z-10">
        <div className="w-full p-4 bg-red-200 rounded-lg shadow-md">로고</div>
        <div className="w-full p-4 bg-yellow-200 rounded-lg shadow-md">날씨 정보</div>
      </div>

      {/* 배경 흐릿한 효과 */}
      {!isLoggedIn && <div className="fixed inset-0 bg-black opacity-50 z-10"></div>}

      {/* 로그인 폼 */}
      {!isLoggedIn && (
        <div
          className={`max-w-md absolute bottom-0 left-0 w-full bg-white p-5 shadow-md z-20 transition-transform duration-500 ${
            showLoginForm ? 'transform translate-y-0' : 'transform translate-y-full'
          }`}
        >
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="">
              <label className="block mb-2 text-gray-600 font-bold">
                이메일<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="(예시) abcde@naver.com"
              />
            </div>
            <div className=" mt-4">
              <label className="block mb-2 text-gray-600 font-bold">
                비밀번호<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                {...register('password', { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="영문/숫자/특수문자 2가지 이상 조합 (8-15자)"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full h-14 bg-blue-600 text-white font-bold px-4 py-2 mt-6 mb-3 rounded-lg hover:bg-blue-500 transition-colors duration-300"
              >
                이메일로 로그인
              </button>
              <button
                type="button"
                className="w-full h-14 bg-[#FEE500] font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors duration-300 mb-6"
              >
                카카오 로그인
              </button>
            </div>
          </form>
          <div className="flex justify-between mt-6">
            <Link to="/signup" className="font-bold hover:underline">
              회원가입
            </Link>
            <Link to="/findemail" className="font-bold hover:underline">
              이메일 찾기
            </Link>
            <Link to="/findpassword" className="font-bold hover:underline">
              비밀번호 찾기
            </Link>
          </div>
        </div>
      )}

      {/* 홈 화면 컨텐츠 */}
      <div className="w-full max-w-md flex flex-col items-center justify-start relative z-0 mt-24">
        {/* 최신 게시물 목록 */}
        {isLoggedIn && (
          <div className="w-full p-4 bg-white rounded-lg shadow-md">
            <p>최신 게시물 목록</p>
          </div>
        )}
      </div>
      <FooterNavi />
    </div>
  );
}
