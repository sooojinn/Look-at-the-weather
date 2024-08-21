import { Link } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BASEURL } from '@/config/constants';
import axios from 'axios';
import Cookies from 'js-cookie';
import InputWithLabel from '@components/form/InputWithLabel';
import Button from '@components/common/molecules/Button';
import Text from '@components/common/atom/Text';

interface LoginFormProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export default function LoginModal({ setIsLoggedIn }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setShowForm(true);
  }, []);

  const handleLogin = async (data: any) => {
    console.log('제출');
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

  const linkList = [
    { path: '/signup', label: '회원가입' },
    { path: '/findemail', label: '이메일 찾기' },
    { path: '/findpassword', label: '비밀번호 찾기' },
  ];

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
          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
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
                }}
                errors={errors}
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
                    message: '영문/숫자/특수문자 조합으로 8~16자 이내여야 합니다.',
                  },
                }}
                errors={errors}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button type="main" onClick={handleSubmit(handleLogin)}>
                이메일로 로그인
              </Button>
              <button
                type="button"
                className="w-full h-14 bg-[#FEE500] font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors duration-300 mb-6"
              >
                카카오 로그인
              </button>
            </div>
          </form>
          <div className="h-12 flex justify-between">
            {linkList.map(({ path, label }) => (
              <Link to={path} className="w-[106px] flex justify-center items-center">
                <Text weight="bold">{label}</Text>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
