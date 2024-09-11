import { Link } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BASEURL } from '@/config/constants';
import axios from 'axios';
import Cookies from 'js-cookie';

interface LoginFormProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export default function LoginModal({ setIsLoggedIn }: LoginFormProps) {
  const { register, handleSubmit } = useForm();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setShowForm(true);
  }, []);

  const handleLogin = async (data: any) => {
    try {
      const response = await axios.post(`${BASEURL}auth/login`, data);
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', `Bearer ${accessToken}`);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-end">
        {/* 배경 흐리게 */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className={`w-full max-w-md bg-white px-5 py-10 rounded-t-3xl z-20 transition-transform duration-500 ease-out ${
            showForm ? 'transform translate-y-0' : 'transform translate-y-full'
          }`}
        >
          <form onSubmit={handleSubmit(handleLogin)}>
            <div>
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
          <div className="h-12 flex justify-between">
            <Link to="/signup" className="w-[106px] flex justify-center items-center font-bold hover:underline">
              회원가입
            </Link>
            <Link to="/findemail" className="w-[106px] flex justify-center items-center font-bold hover:underline">
              이메일 찾기
            </Link>
            <Link to="/findpassword" className="w-[106px] flex justify-center items-center font-bold hover:underline">
              비밀번호 찾기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
