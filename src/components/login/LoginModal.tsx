import { Link } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { postLogin } from '@/api/apis';
import InputWithLabel from '@components/form/InputWithLabel';
import useAuthService from '@/hooks/useAuthService';
import useUserInfo from '@/hooks/useUserInfo';
import Button from '@components/common/molecules/Button';
import Text from '@components/common/atom/Text';
import KakaoLogin from './KakaoLogin';

interface LoginFormProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export default function LoginModal({ setIsLoggedIn }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();
  const [showForm, setShowForm] = useState(false);

  const { setRefreshToken, setAccessToken, isLogin } = useAuthService();
  const { getUserInfo, setUserInfo } = useUserInfo();

  const handleLoginCheck = async () => {
    const loggedIn = await isLogin();

    if (loggedIn) {
      setIsLoggedIn(true);
    }
  };

  const handleLogin = async (loginData: any) => {
    try {
      const response = await postLogin(loginData);
      // const response = await postLogin({
      //   email: 'bbb111@naver.com',
      //   password: 'ccc123',
      // });

      const { accessToken, refreshToken } = response.data;
      setRefreshToken(refreshToken);
      setAccessToken(accessToken);
      setUserInfo('email', response.data.email);
      setUserInfo('name', response.data.name);
      setUserInfo('nickname', response.data.nickname);
      setUserInfo('social', response.data.social);
      handleLoginCheck();
    } catch (error) {
      console.error(error);
      setError('password', { message: '이메일 혹은 비밀번호가 일치하지 않습니다.' });
    }
  };

  const linkList = [
    { path: '/signup', label: '회원가입' },
    { path: '/findemail', label: '이메일 찾기' },
    { path: '/findpassword', label: '비밀번호 찾기' },
  ];

  useEffect(() => {
    setShowForm(true);
  }, []);

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
                }}
                errors={errors}
                setValue={setValue}
              />

              <InputWithLabel
                name="password"
                type="password"
                label="비밀번호"
                placeholder="영문/숫자/특수문자 2가지 이상 조합 (8-15자)"
                register={register}
                rules={{
                  required: '비밀번호를 입력해 주세요.',
                }}
                errors={errors}
                setValue={setValue}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button type="main" onClick={handleSubmit(handleLogin)}>
                이메일로 로그인
              </Button>
              <KakaoLogin />
            </div>
          </form>
          <div className="h-12 mt-6 flex justify-between">
            {linkList.map(({ path, label }) => (
              <Link key={path} to={path} className="w-[106px] flex justify-center items-center">
                <Text weight="bold">{label}</Text>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
