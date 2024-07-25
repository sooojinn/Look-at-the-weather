import { Link } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { BASEURL } from '../../constants/constants';
import axios from 'axios';
import Cookies from 'js-cookie';

interface LoginFormProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export default function LoginForm({ setIsLoggedIn }: LoginFormProps) {
  const { register, handleSubmit } = useForm();

  const handleLogin = async (data: any) => {
    try {
      const response = await axios.post(`${BASEURL}/api/v1/auth/login`, data);
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);
      console.log(data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={'max-w-md absolute bottom-0 left-0 w-full bg-white p-5 shadow-md z-20'}>
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
  );
}
