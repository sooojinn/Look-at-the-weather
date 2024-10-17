import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@components/common/molecules/Button';
import Text from '@components/common/atom/Text';
import KakaoLogin from './KakaoLogin';
import { setAccessToken } from '@/api/instance';
import { postLogin } from '@/api/apis';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '@components/common/molecules/ToastProvider';
import { ErrorResponse } from '@/config/types';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/store/authStore';
import BackgroundShadow from '@components/common/organism/BackgroundShadow';
import EmailInput from '@components/form/inputs/EmailInput';
import PasswordInput from '@components/form/inputs/PasswordInput';

export default function LoginModal() {
  const { setIsLogin, setNickName, setIsSocial } = useAuthStore();
  const formMethods = useForm();
  const { handleSubmit, setError } = formMethods;

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setShowForm(true);
  }, []);

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: ({ data }) => {
      const { accessToken, nickName, social } = data;
      setAccessToken(accessToken);
      setNickName(nickName);
      setIsLogin(true);
      setIsSocial(social);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.errorCode === 'NOT_EXIST_EMAIL') {
        setError('email', { message: '이메일이 존재하지 않습니다.' });
      } else if (error.response?.data.errorCode === 'INVALID_PASSWORD') {
        setError('password', { message: '잘못된 비밀번호입니다.' });
      } else {
        console.error('로그인 실패: ', error);
        showToast('로그인 실패. 다시 시도해주세요.');
      }
    },
  });

  const handleLogin = async (data: any) => {
    loginMutation.mutate(data);
    const img = new Image();
    img.src = '/assets/user_icon.png';
  };

  const linkList = [
    { path: '/signup', label: '회원가입', index: 1 },
    { path: '/find-email', label: '이메일 찾기', index: 2 },
    { path: '/find-password', label: '비밀번호 찾기', index: 3 },
  ];

  return (
    <>
      <BackgroundShadow>
        <div
          className={`fixed bottom-0 w-full max-w-md bg-white px-5 py-10 rounded-t-3xl z-20 transition-transform duration-500 ease-out ${
            showForm ? 'transform translate-y-0' : 'transform translate-y-full'
          }`}
        >
          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <EmailInput {...formMethods} />
              <PasswordInput {...formMethods} />
            </div>
            <div className="flex flex-col gap-3">
              <Button type="main" onClick={handleSubmit(handleLogin)}>
                이메일로 로그인
              </Button>
              <KakaoLogin />
            </div>
          </form>
          <div className="h-12 mt-6 flex justify-between">
            {linkList.map(({ path, label, index }) => (
              <Link key={index} to={path} className="w-[106px] flex justify-center items-center">
                <Text weight="bold">{label}</Text>
              </Link>
            ))}
          </div>
        </div>
      </BackgroundShadow>
    </>
  );
}
